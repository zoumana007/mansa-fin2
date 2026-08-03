import { createHash, randomUUID } from "node:crypto";
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../database/prisma.service.js";
import { LedgerService } from "../ledger/ledger.service.js";
import type { CreateInternalPaymentDto } from "./dto/payment.dto.js";
import { hasSufficientBalance } from "./payment-policy.js";

function hashRequest(input: CreateInternalPaymentDto): string {
  return createHash("sha256")
    .update(
      JSON.stringify([
        input.payerWalletId,
        input.payeeWalletId,
        input.amount,
        input.currencyCode,
        input.countryCode,
        input.environment,
        input.description,
      ]),
    )
    .digest("hex");
}

function uniqueError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
}

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ledger: LedgerService,
  ) {}

  async createInternal(input: CreateInternalPaymentDto, userId: string) {
    if (input.payerWalletId === input.payeeWalletId)
      throw new BadRequestException("Payer and payee wallets must differ");
    const hash = hashRequest(input);
    const existing = await this.findIdempotent(input.environment, input.idempotencyKey);
    if (existing !== null) return this.resolveIdempotent(existing, hash);
    try {
      return await this.prisma.$transaction(
        async (database) => {
          const wallets = await database.wallet.findMany({
            where: {
              id: { in: [input.payerWalletId, input.payeeWalletId] },
              currencyCode: input.currencyCode,
              countryCode: input.countryCode,
              environment: input.environment,
            },
            select: { id: true, ownerUserId: true, status: true, ledgerAccountId: true },
          });
          const payer = wallets.find(({ id }) => id === input.payerWalletId);
          const payee = wallets.find(({ id }) => id === input.payeeWalletId);
          if (payer === undefined || payee === undefined)
            throw new BadRequestException("Wallet context does not match payment");
          if (payer.ownerUserId !== userId)
            throw new ForbiddenException("Payer wallet does not belong to authenticated user");
          if (
            payer.status !== "ACTIVE" ||
            (payee.status !== "ACTIVE" && payee.status !== "LIMITED")
          )
            throw new BadRequestException("Wallet is not available for this payment");
          const balances = await database.ledgerEntry.groupBy({
            by: ["direction"],
            where: { accountId: payer.ledgerAccountId, status: "POSTED" },
            _sum: { amount: true },
          });
          const total = (direction: "CREDIT" | "DEBIT") =>
            balances.find((item) => item.direction === direction)?._sum.amount ?? 0n;
          if (!hasSufficientBalance(total("CREDIT"), total("DEBIT"), BigInt(input.amount)))
            throw new BadRequestException("Insufficient available balance");
          const payment = await database.payment.create({
            data: {
              publicReference: `pay_${randomUUID().replaceAll("-", "")}`,
              status: "PROCESSING",
              payerWalletId: payer.id,
              payeeWalletId: payee.id,
              amount: BigInt(input.amount),
              currencyCode: input.currencyCode,
              countryCode: input.countryCode,
              environment: input.environment,
              idempotencyKey: input.idempotencyKey,
              requestHash: hash,
              description: input.description,
              initiatedByUserId: userId,
            },
            select: { id: true, publicReference: true },
          });
          const ledgerTransaction = await this.ledger.postTransactionWithClient(
            database,
            {
              journalCode: "GENERAL",
              type: "INTERNAL_PAYMENT",
              businessReference: payment.publicReference,
              idempotencyKey: `payment:${input.idempotencyKey}`,
              currencyCode: input.currencyCode,
              countryCode: input.countryCode,
              environment: input.environment,
              description: input.description,
              correlationId: payment.id,
              source: "payment-service",
              effectiveAt: new Date().toISOString(),
              entries: [
                {
                  accountId: payer.ledgerAccountId,
                  direction: "DEBIT",
                  amount: input.amount,
                  label: input.description,
                },
                {
                  accountId: payee.ledgerAccountId,
                  direction: "CREDIT",
                  amount: input.amount,
                  label: input.description,
                },
              ],
            },
            userId,
          );
          if (ledgerTransaction === null)
            throw new ConflictException("Ledger transaction could not be reloaded");
          const completed = await database.payment.update({
            where: { id: payment.id },
            data: {
              status: "COMPLETED",
              ledgerTransactionId: ledgerTransaction.id,
              completedAt: new Date(),
            },
          });
          await database.paymentAudit.create({
            data: {
              paymentId: payment.id,
              actorUserId: userId,
              action: "payment.internal.complete",
              details: { ledgerTransactionId: ledgerTransaction.id, requestHash: hash },
            },
          });
          return this.serialize(completed);
        },
        { isolationLevel: "Serializable" },
      );
    } catch (error) {
      if (!uniqueError(error)) throw error;
      const concurrent = await this.findIdempotent(input.environment, input.idempotencyKey);
      if (concurrent === null) throw error;
      return this.resolveIdempotent(concurrent, hash);
    }
  }

  listSelf(userId: string) {
    return this.prisma.payment
      .findMany({ where: { initiatedByUserId: userId }, orderBy: { createdAt: "desc" }, take: 100 })
      .then((items) => items.map((item) => this.serialize(item)));
  }
  listAll() {
    return this.prisma.payment
      .findMany({ orderBy: { createdAt: "desc" }, take: 100 })
      .then((items) => items.map((item) => this.serialize(item)));
  }
  listAudit() {
    return this.prisma.paymentAudit.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  }
  async getSelf(id: string, userId: string) {
    const item = await this.prisma.payment.findFirst({ where: { id, initiatedByUserId: userId } });
    if (item === null) throw new NotFoundException("Payment not found");
    return this.serialize(item);
  }
  private findIdempotent(environment: string, idempotencyKey: string) {
    return this.prisma.payment.findUnique({
      where: { environment_idempotencyKey: { environment, idempotencyKey } },
    });
  }
  private resolveIdempotent<T extends { requestHash: string; amount: bigint; feeAmount: bigint }>(
    payment: T,
    hash: string,
  ) {
    if (payment.requestHash !== hash)
      throw new ConflictException("Idempotency key was already used with another request");
    return this.serialize(payment);
  }
  private serialize<T extends { amount: bigint; feeAmount: bigint }>(payment: T) {
    return {
      ...payment,
      amount: payment.amount.toString(),
      feeAmount: payment.feeAmount.toString(),
    };
  }
}
