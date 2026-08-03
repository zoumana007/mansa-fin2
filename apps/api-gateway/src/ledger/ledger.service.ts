import { createHash } from "node:crypto";

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../database/prisma.service.js";
import type { Prisma } from "../generated/prisma/client.js";
import type { CreateLedgerAccountDto, PostLedgerTransactionDto } from "./dto/ledger.dto.js";
import { assertBalanced, calculateBalance } from "./ledger-policy.js";

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value !== null && typeof value === "object") {
    return `{${Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => `${JSON.stringify(key)}:${stableJson(item)}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function requestHash(input: PostLedgerTransactionDto): string {
  return createHash("sha256").update(stableJson(input)).digest("hex");
}

function isUniqueConstraintError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
}

@Injectable()
export class LedgerService {
  constructor(private readonly prisma: PrismaService) {}

  async createAccount(input: CreateLedgerAccountDto, actorUserId: string) {
    try {
      return await this.prisma.$transaction(async (transaction) => {
        const account = await transaction.ledgerAccount.create({
          data: {
            publicReference: input.publicReference,
            ownerType: input.ownerType,
            ownerId: input.ownerId ?? null,
            type: input.type,
            subtype: input.subtype ?? null,
            currencyCode: input.currencyCode,
            countryCode: input.countryCode,
            environment: input.environment,
            normalBalance: input.normalBalance,
          },
        });
        await transaction.ledgerAudit.create({
          data: {
            actorUserId,
            action: "ledger.account.create",
            reason: input.reason,
            details: { accountId: account.id, publicReference: account.publicReference },
          },
        });
        return account;
      });
    } catch (error) {
      if (isUniqueConstraintError(error))
        throw new ConflictException("Ledger account reference already exists");
      throw error;
    }
  }

  listAccounts() {
    return this.prisma.ledgerAccount.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  }

  async getAccount(accountId: string) {
    const account = await this.prisma.ledgerAccount.findUnique({ where: { id: accountId } });
    if (account === null) throw new NotFoundException("Ledger account not found");
    return account;
  }

  async getBalance(accountId: string) {
    const account = await this.getAccount(accountId);
    const [debits, credits] = await Promise.all([
      this.prisma.ledgerEntry.aggregate({
        where: { accountId, status: "POSTED", direction: "DEBIT" },
        _sum: { amount: true },
      }),
      this.prisma.ledgerEntry.aggregate({
        where: { accountId, status: "POSTED", direction: "CREDIT" },
        _sum: { amount: true },
      }),
    ]);
    const debitTotal = debits._sum.amount ?? 0n;
    const creditTotal = credits._sum.amount ?? 0n;
    return {
      accountId,
      currencyCode: account.currencyCode,
      normalBalance: account.normalBalance,
      debits: debitTotal.toString(),
      credits: creditTotal.toString(),
      balance: calculateBalance(account.normalBalance, debitTotal, creditTotal).toString(),
    };
  }

  async getAccountEntries(accountId: string) {
    await this.getAccount(accountId);
    const entries = await this.prisma.ledgerEntry.findMany({
      where: { accountId, status: "POSTED" },
      orderBy: [{ createdAt: "desc" }, { sequence: "desc" }],
      take: 100,
    });
    return entries.map((entry) => ({ ...entry, amount: entry.amount.toString() }));
  }

  listAudit() {
    return this.prisma.ledgerAudit.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  }

  async postTransaction(input: PostLedgerTransactionDto, actorUserId: string) {
    try {
      assertBalanced(input.entries);
    } catch (error) {
      throw new BadRequestException(
        error instanceof Error ? error.message : "Invalid ledger entries",
      );
    }
    const hash = requestHash(input);
    const existing = await this.findIdempotent(input.environment, input.idempotencyKey);
    if (existing !== null) return this.resolveIdempotent(existing, hash);

    try {
      const transaction = await this.prisma.$transaction(
        (database) => this.postTransactionWithClient(database, input, actorUserId, hash),
        { isolationLevel: "Serializable" },
      );
      return transaction;
    } catch (error) {
      if (!isUniqueConstraintError(error)) throw error;
      const concurrent = await this.findIdempotent(input.environment, input.idempotencyKey);
      if (concurrent === null) throw error;
      return this.resolveIdempotent(concurrent, hash);
    }
  }

  async postTransactionWithClient(
    database: Prisma.TransactionClient,
    input: PostLedgerTransactionDto,
    actorUserId: string,
    hash = requestHash(input),
  ) {
    assertBalanced(input.entries);
    const journal = await database.ledgerJournal.findUnique({
      where: { code: input.journalCode },
      select: { id: true, active: true },
    });
    if (!journal?.active) throw new BadRequestException("Ledger journal is unavailable");
    const accountIds = [...new Set(input.entries.map(({ accountId }) => accountId))];
    const accounts = await database.ledgerAccount.findMany({
      where: {
        id: { in: accountIds },
        status: "ACTIVE",
        currencyCode: input.currencyCode,
        countryCode: input.countryCode,
        environment: input.environment,
      },
      select: { id: true, wallet: { select: { status: true } } },
    });
    if (
      accounts.length !== accountIds.length ||
      accounts.some(
        ({ wallet }) =>
          wallet !== null && wallet.status !== "ACTIVE" && wallet.status !== "LIMITED",
      )
    )
      throw new BadRequestException(
        "Every ledger account must be active, usable and match transaction context",
      );
    const created = await database.ledgerTransaction.create({
      data: {
        journalId: journal.id,
        type: input.type,
        businessReference: input.businessReference ?? null,
        idempotencyKey: input.idempotencyKey,
        requestHash: hash,
        status: "PREPARED",
        currencyCode: input.currencyCode,
        countryCode: input.countryCode,
        environment: input.environment,
        description: input.description,
        correlationId: input.correlationId ?? null,
        source: input.source,
        createdByUserId: actorUserId,
        effectiveAt: new Date(input.effectiveAt),
        parentId: input.parentId ?? null,
        ...(input.metadata === undefined
          ? {}
          : { metadata: input.metadata as Prisma.InputJsonValue }),
        entries: {
          create: input.entries.map((entry, index) => ({
            accountId: entry.accountId,
            direction: entry.direction,
            amount: BigInt(entry.amount),
            currencyCode: input.currencyCode,
            sequence: index + 1,
            label: entry.label,
            reference: entry.reference ?? null,
          })),
        },
      },
      select: { id: true },
    });
    await database.ledgerEntry.updateMany({
      where: { transactionId: created.id },
      data: { status: "POSTED" },
    });
    await database.ledgerTransaction.update({
      where: { id: created.id },
      data: { status: "POSTED", postedAt: new Date() },
    });
    await database.ledgerAudit.create({
      data: {
        transactionId: created.id,
        actorUserId,
        action: "ledger.transaction.post",
        details: { idempotencyKey: input.idempotencyKey, requestHash: hash },
      },
    });
    return this.getTransactionWithClient(database, created.id);
  }

  async getTransaction(transactionId: string) {
    const transaction = await this.getTransactionWithClient(this.prisma, transactionId);
    if (transaction === null) throw new NotFoundException("Ledger transaction not found");
    return transaction;
  }

  private findIdempotent(environment: string, idempotencyKey: string) {
    return this.prisma.ledgerTransaction.findUnique({
      where: { environment_idempotencyKey: { environment, idempotencyKey } },
      include: { entries: { orderBy: { sequence: "asc" } } },
    });
  }

  private resolveIdempotent(
    transaction: NonNullable<Awaited<ReturnType<LedgerService["findIdempotent"]>>>,
    hash: string,
  ) {
    if (transaction.requestHash !== hash)
      throw new ConflictException("Idempotency key was already used with another request");
    return this.serializeTransaction(transaction);
  }

  private async getTransactionWithClient(
    client: Prisma.TransactionClient | PrismaService,
    transactionId: string,
  ) {
    const transaction = await client.ledgerTransaction.findUnique({
      where: { id: transactionId },
      include: { entries: { orderBy: { sequence: "asc" } } },
    });
    return transaction === null ? null : this.serializeTransaction(transaction);
  }

  private serializeTransaction<T extends { entries: { amount: bigint }[] }>(transaction: T) {
    return {
      ...transaction,
      entries: transaction.entries.map((entry) => ({ ...entry, amount: entry.amount.toString() })),
    };
  }
}
