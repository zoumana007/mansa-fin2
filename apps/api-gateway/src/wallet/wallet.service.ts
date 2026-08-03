import { randomUUID } from "node:crypto";

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../database/prisma.service.js";
import type { Prisma } from "../generated/prisma/client.js";
import { calculateBalance } from "../ledger/ledger-policy.js";
import type { CreateSelfWalletDto, UpdateWalletStatusDto } from "./dto/wallet.dto.js";
import { canTransitionWallet } from "./wallet-policy.js";

function isUniqueConstraintError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
}

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}

  async createSelf(input: CreateSelfWalletDto, userId: string) {
    try {
      return await this.prisma.$transaction(
        async (transaction) => {
          const user = await transaction.user.findUnique({
            where: { id: userId },
            select: { countryCode: true },
          });
          if (user === null) throw new NotFoundException("User not found");
          if (user.countryCode !== null && user.countryCode !== input.countryCode)
            throw new BadRequestException("Wallet country must match user country");
          const ledgerAccount = await transaction.ledgerAccount.create({
            data: {
              publicReference: `led_acc_${randomUUID().replaceAll("-", "")}`,
              ownerType: "USER",
              ownerId: userId,
              type: "LIABILITY",
              subtype: `WALLET_${input.type}`,
              currencyCode: input.currencyCode,
              countryCode: input.countryCode,
              environment: input.environment,
              normalBalance: "CREDIT",
            },
          });
          const wallet = await transaction.wallet.create({
            data: {
              publicReference: `wal_${randomUUID().replaceAll("-", "")}`,
              ownerType: "USER",
              ownerId: userId,
              ownerUserId: userId,
              type: input.type,
              currencyCode: input.currencyCode,
              countryCode: input.countryCode,
              environment: input.environment,
              ledgerAccountId: ledgerAccount.id,
            },
            include: { ledgerAccount: true },
          });
          await transaction.walletAudit.create({
            data: {
              walletId: wallet.id,
              actorUserId: userId,
              action: "wallet.create",
              newValue: {
                status: wallet.status,
                type: wallet.type,
                currencyCode: wallet.currencyCode,
              },
            },
          });
          return wallet;
        },
        { isolationLevel: "Serializable" },
      );
    } catch (error) {
      if (isUniqueConstraintError(error)) throw new ConflictException("This wallet already exists");
      throw error;
    }
  }

  listSelf(userId: string) {
    return this.prisma.wallet.findMany({
      where: { ownerUserId: userId },
      include: { ledgerAccount: true },
      orderBy: { createdAt: "asc" },
    });
  }

  listAll() {
    return this.prisma.wallet.findMany({
      include: { ledgerAccount: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  }

  async getSelf(walletId: string, userId: string) {
    const wallet = await this.prisma.wallet.findFirst({
      where: { id: walletId, ownerUserId: userId },
      include: { ledgerAccount: true },
    });
    if (wallet === null) throw new NotFoundException("Wallet not found");
    return wallet;
  }

  async getSelfBalance(walletId: string, userId: string) {
    const wallet = await this.getSelf(walletId, userId);
    const [debits, credits] = await Promise.all([
      this.prisma.ledgerEntry.aggregate({
        where: { accountId: wallet.ledgerAccountId, status: "POSTED", direction: "DEBIT" },
        _sum: { amount: true },
      }),
      this.prisma.ledgerEntry.aggregate({
        where: { accountId: wallet.ledgerAccountId, status: "POSTED", direction: "CREDIT" },
        _sum: { amount: true },
      }),
    ]);
    const debitTotal = debits._sum.amount ?? 0n;
    const creditTotal = credits._sum.amount ?? 0n;
    return {
      walletId,
      currencyCode: wallet.currencyCode,
      accountingBalance: calculateBalance("CREDIT", debitTotal, creditTotal).toString(),
      availableBalance: calculateBalance("CREDIT", debitTotal, creditTotal).toString(),
      reservedBalance: "0",
    };
  }

  async getSelfHistory(walletId: string, userId: string) {
    const wallet = await this.getSelf(walletId, userId);
    const entries = await this.prisma.ledgerEntry.findMany({
      where: { accountId: wallet.ledgerAccountId, status: "POSTED" },
      include: {
        transaction: {
          select: {
            id: true,
            type: true,
            description: true,
            effectiveAt: true,
            postedAt: true,
            businessReference: true,
          },
        },
      },
      orderBy: [{ createdAt: "desc" }, { sequence: "desc" }],
      take: 100,
    });
    return entries.map((entry) => ({ ...entry, amount: entry.amount.toString() }));
  }

  async updateStatus(walletId: string, input: UpdateWalletStatusDto, actorUserId: string) {
    return this.prisma.$transaction(
      async (transaction) => {
        const wallet = await transaction.wallet.findUnique({ where: { id: walletId } });
        if (wallet === null) throw new NotFoundException("Wallet not found");
        if (!canTransitionWallet(wallet.status, input.status))
          throw new BadRequestException("Wallet status transition is not allowed");
        if (input.status === "ACTIVE" && wallet.verificationLevel === "UNVERIFIED")
          throw new BadRequestException("An unverified wallet cannot be activated");
        const result = await transaction.wallet.updateMany({
          where: { id: walletId, version: input.expectedVersion },
          data: {
            status: input.status,
            statusReason: input.reason,
            version: { increment: 1 },
            frozenAt: input.status === "FROZEN" ? new Date() : null,
            closedAt: input.status === "CLOSED" ? new Date() : null,
            ...(input.limits === undefined
              ? {}
              : { limits: input.limits as Prisma.InputJsonValue }),
          },
        });
        if (result.count !== 1) throw new ConflictException("Wallet was modified concurrently");
        await transaction.walletAudit.create({
          data: {
            walletId,
            actorUserId,
            action: "wallet.status.update",
            reason: input.reason,
            previousValue: { status: wallet.status, version: wallet.version },
            newValue: { status: input.status, version: wallet.version + 1 },
          },
        });
        return transaction.wallet.findUniqueOrThrow({ where: { id: walletId } });
      },
      { isolationLevel: "Serializable" },
    );
  }

  listAudit() {
    return this.prisma.walletAudit.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  }
}
