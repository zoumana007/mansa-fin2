import { createHash, randomBytes, randomUUID } from "node:crypto";

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../database/prisma.service.js";
import { calculateBalance } from "../ledger/ledger-policy.js";
import { LedgerService } from "../ledger/ledger.service.js";
import type { Prisma } from "../generated/prisma/client.js";
import type {
  CloseCashRegisterDto,
  AuthorizeCashWithdrawalDto,
  CreateCashDepositDto,
  CreateCashAgentDto,
  DeclareCashRegisterDto,
  ExecuteCashWithdrawalDto,
  OpenCashRegisterDto,
  UpdateCashAgentStatusDto,
} from "./dto/agent.dto.js";
import { canTransitionCashAgent } from "./agent-policy.js";

function isUniqueConstraintError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
}

@Injectable()
export class AgentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ledger: LedgerService,
  ) {}

  async create(input: CreateCashAgentDto, actorUserId: string) {
    try {
      return await this.prisma.$transaction(
        async (transaction) => {
          const user = await transaction.user.findUnique({
            where: { id: input.ownerUserId },
            include: { kycProfile: true },
          });
          if (user === null) throw new NotFoundException("User not found");
          if (user.status !== "ACTIVE") throw new BadRequestException("Agent owner must be active");
          if (user.countryCode !== input.countryCode)
            throw new BadRequestException("Agent country must match owner country");
          if (user.kycProfile?.status !== "APPROVED")
            throw new BadRequestException("Agent owner must have an approved KYC");

          const agent = await transaction.cashAgent.create({
            data: {
              publicReference: `agt_${randomUUID().replaceAll("-", "")}`,
              ownerUserId: input.ownerUserId,
              type: input.type,
              countryCode: input.countryCode,
              environment: input.environment,
              statusReason: input.reason,
            },
          });
          const ledgerAccount = await transaction.ledgerAccount.create({
            data: {
              publicReference: `led_acc_${randomUUID().replaceAll("-", "")}`,
              ownerType: "TECHNICAL",
              ownerId: agent.id,
              type: "LIABILITY",
              subtype: "AGENT_FLOAT",
              currencyCode: input.currencyCode,
              countryCode: input.countryCode,
              environment: input.environment,
              normalBalance: "CREDIT",
            },
          });
          await transaction.cashAgentFloatAccount.create({
            data: {
              cashAgentId: agent.id,
              ledgerAccountId: ledgerAccount.id,
              currencyCode: input.currencyCode,
            },
          });
          await transaction.cashNetworkAudit.create({
            data: {
              cashAgentId: agent.id,
              actorUserId,
              action: "agent.create",
              reason: input.reason,
              newValue: {
                status: agent.status,
                type: agent.type,
                currencyCode: input.currencyCode,
              },
            },
          });
          return transaction.cashAgent.findUniqueOrThrow({
            where: { id: agent.id },
            include: { floatAccounts: { include: { ledgerAccount: true } } },
          });
        },
        { isolationLevel: "Serializable" },
      );
    } catch (error) {
      if (isUniqueConstraintError(error))
        throw new ConflictException("User already owns a Cash Agent");
      throw error;
    }
  }

  list() {
    return this.prisma.cashAgent.findMany({
      include: { floatAccounts: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  }

  async get(agentId: string) {
    const agent = await this.prisma.cashAgent.findUnique({
      where: { id: agentId },
      include: { floatAccounts: { include: { ledgerAccount: true } } },
    });
    if (agent === null) throw new NotFoundException("Cash Agent not found");
    return agent;
  }

  async updateStatus(agentId: string, input: UpdateCashAgentStatusDto, actorUserId: string) {
    return this.prisma.$transaction(
      async (transaction) => {
        const agent = await transaction.cashAgent.findUnique({ where: { id: agentId } });
        if (agent === null) throw new NotFoundException("Cash Agent not found");
        if (!canTransitionCashAgent(agent.status, input.status))
          throw new BadRequestException("Cash Agent status transition is not allowed");
        const result = await transaction.cashAgent.updateMany({
          where: { id: agentId, version: input.expectedVersion },
          data: {
            status: input.status,
            statusReason: input.reason,
            version: { increment: 1 },
            activatedAt: input.status === "ACTIVE" ? new Date() : agent.activatedAt,
            suspendedAt: input.status === "SUSPENDED" ? new Date() : null,
            closedAt: input.status === "CLOSED" ? new Date() : null,
          },
        });
        if (result.count !== 1) throw new ConflictException("Cash Agent was modified concurrently");
        await transaction.cashAgentFloatAccount.updateMany({
          where: { cashAgentId: agentId },
          data: {
            status:
              input.status === "ACTIVE"
                ? "ACTIVE"
                : input.status === "CLOSED"
                  ? "CLOSED"
                  : "SUSPENDED",
          },
        });
        await transaction.cashNetworkAudit.create({
          data: {
            cashAgentId: agentId,
            actorUserId,
            action: "agent.status.update",
            reason: input.reason,
            previousValue: { status: agent.status, version: agent.version },
            newValue: { status: input.status, version: agent.version + 1 },
          },
        });
        return transaction.cashAgent.findUniqueOrThrow({
          where: { id: agentId },
          include: { floatAccounts: true },
        });
      },
      { isolationLevel: "Serializable" },
    );
  }

  async getSelfFloat(userId: string) {
    const agent = await this.prisma.cashAgent.findUnique({
      where: { ownerUserId: userId },
      include: { floatAccounts: true },
    });
    if (agent === null) throw new NotFoundException("Cash Agent not found");
    const positions = await Promise.all(
      agent.floatAccounts.map(async (account) => {
        const [debits, credits] = await Promise.all([
          this.prisma.ledgerEntry.aggregate({
            where: { accountId: account.ledgerAccountId, status: "POSTED", direction: "DEBIT" },
            _sum: { amount: true },
          }),
          this.prisma.ledgerEntry.aggregate({
            where: { accountId: account.ledgerAccountId, status: "POSTED", direction: "CREDIT" },
            _sum: { amount: true },
          }),
        ]);
        return {
          id: account.id,
          currencyCode: account.currencyCode,
          status: account.status,
          availableAmount: calculateBalance(
            "DEBIT",
            debits._sum.amount ?? 0n,
            credits._sum.amount ?? 0n,
          ).toString(),
          reservedAmount: "0",
        };
      }),
    );
    return { agentId: agent.id, agentStatus: agent.status, positions };
  }

  listAudit() {
    return this.prisma.cashNetworkAudit.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  }

  async openCashRegister(input: OpenCashRegisterDto, userId: string) {
    try {
      return await this.prisma.$transaction(
        async (transaction) => {
          const agent = await transaction.cashAgent.findUnique({ where: { ownerUserId: userId } });
          if (agent === null) throw new NotFoundException("Cash Agent not found");
          if (agent.status !== "ACTIVE") throw new BadRequestException("Cash Agent must be active");
          const amount = BigInt(input.openingAmount);
          const register = await transaction.cashAgentCashRegister.create({
            data: {
              publicReference: `cash_reg_${randomUUID().replaceAll("-", "")}`,
              cashAgentId: agent.id,
              currencyCode: input.currencyCode,
              openingAmount: amount,
              theoreticalAmount: amount,
              ...(input.denominations === undefined
                ? {}
                : { openingDenominations: input.denominations as Prisma.InputJsonValue }),
              openedByUserId: userId,
              declarations: {
                create: {
                  declaredByUserId: userId,
                  type: "OPENING",
                  amount,
                  ...(input.denominations === undefined
                    ? {}
                    : { denominations: input.denominations as Prisma.InputJsonValue }),
                },
              },
            },
          });
          await transaction.cashNetworkAudit.create({
            data: {
              cashAgentId: agent.id,
              actorUserId: userId,
              action: "agent.cash_register.open",
              newValue: {
                registerId: register.id,
                currencyCode: input.currencyCode,
                openingAmount: input.openingAmount,
              },
            },
          });
          return this.serializeRegister(register);
        },
        { isolationLevel: "Serializable" },
      );
    } catch (error) {
      if (isUniqueConstraintError(error))
        throw new ConflictException("A cash register is already open for this currency");
      throw error;
    }
  }

  async declareCash(input: DeclareCashRegisterDto, userId: string) {
    return this.prisma.$transaction(
      async (transaction) => {
        const register = await transaction.cashAgentCashRegister.findFirst({
          where: { cashAgent: { ownerUserId: userId }, status: "OPEN" },
          orderBy: { openedAt: "desc" },
        });
        if (register === null) throw new NotFoundException("Open cash register not found");
        const declaration = await transaction.cashAgentCashDeclaration.create({
          data: {
            cashRegisterId: register.id,
            declaredByUserId: userId,
            type: "INTERIM",
            amount: BigInt(input.amount),
            ...(input.denominations === undefined
              ? {}
              : { denominations: input.denominations as Prisma.InputJsonValue }),
            ...(input.note === undefined ? {} : { note: input.note }),
          },
        });
        await transaction.cashNetworkAudit.create({
          data: {
            cashAgentId: register.cashAgentId,
            actorUserId: userId,
            action: "agent.cash_register.declare",
            newValue: {
              registerId: register.id,
              declarationId: declaration.id,
              amount: input.amount,
            },
          },
        });
        return { ...declaration, amount: declaration.amount.toString() };
      },
      { isolationLevel: "Serializable" },
    );
  }

  async closeCashRegister(input: CloseCashRegisterDto, userId: string) {
    return this.prisma.$transaction(
      async (transaction) => {
        const register = await transaction.cashAgentCashRegister.findFirst({
          where: { cashAgent: { ownerUserId: userId }, status: "OPEN" },
          orderBy: { openedAt: "desc" },
        });
        if (register === null) throw new NotFoundException("Open cash register not found");
        const declaredAmount = BigInt(input.amount);
        const varianceAmount = declaredAmount - register.theoreticalAmount;
        const result = await transaction.cashAgentCashRegister.updateMany({
          where: { id: register.id, status: "OPEN", version: input.expectedVersion },
          data: {
            status: "CLOSED",
            declaredClosingAmount: declaredAmount,
            varianceAmount,
            ...(input.denominations === undefined
              ? {}
              : { closingDenominations: input.denominations as Prisma.InputJsonValue }),
            closingReason: input.reason,
            closedByUserId: userId,
            closedAt: new Date(),
            version: { increment: 1 },
          },
        });
        if (result.count !== 1)
          throw new ConflictException("Cash register was modified concurrently");
        await transaction.cashAgentCashDeclaration.create({
          data: {
            cashRegisterId: register.id,
            declaredByUserId: userId,
            type: "CLOSING",
            amount: declaredAmount,
            ...(input.denominations === undefined
              ? {}
              : { denominations: input.denominations as Prisma.InputJsonValue }),
            note: input.reason,
          },
        });
        await transaction.cashNetworkAudit.create({
          data: {
            cashAgentId: register.cashAgentId,
            actorUserId: userId,
            action: "agent.cash_register.close",
            reason: input.reason,
            previousValue: {
              status: register.status,
              theoreticalAmount: register.theoreticalAmount.toString(),
            },
            newValue: {
              status: "CLOSED",
              declaredAmount: input.amount,
              varianceAmount: varianceAmount.toString(),
            },
          },
        });
        const closed = await transaction.cashAgentCashRegister.findUniqueOrThrow({
          where: { id: register.id },
        });
        return this.serializeRegister(closed);
      },
      { isolationLevel: "Serializable" },
    );
  }

  private serializeRegister<
    T extends {
      openingAmount: bigint;
      theoreticalAmount: bigint;
      declaredClosingAmount: bigint | null;
      varianceAmount: bigint | null;
    },
  >(register: T) {
    return {
      ...register,
      openingAmount: register.openingAmount.toString(),
      theoreticalAmount: register.theoreticalAmount.toString(),
      declaredClosingAmount: register.declaredClosingAmount?.toString() ?? null,
      varianceAmount: register.varianceAmount?.toString() ?? null,
    };
  }

  async createCashDeposit(input: CreateCashDepositDto, userId: string) {
    const requestHash = createHash("sha256")
      .update(
        JSON.stringify([
          input.customerWalletId,
          input.amount,
          input.currencyCode,
          input.countryCode,
          input.environment,
          input.description,
        ]),
      )
      .digest("hex");
    const existing = await this.prisma.cashDeposit.findUnique({
      where: {
        environment_idempotencyKey: {
          environment: input.environment,
          idempotencyKey: input.idempotencyKey,
        },
      },
    });
    if (existing !== null) {
      if (existing.requestHash !== requestHash)
        throw new ConflictException("Idempotency key was already used with another request");
      return this.serializeDeposit(existing);
    }
    try {
      return await this.prisma.$transaction(
        async (database) => {
          const agent = await database.cashAgent.findUnique({ where: { ownerUserId: userId } });
          if (agent === null) throw new NotFoundException("Cash Agent not found");
          if (agent.status !== "ACTIVE") throw new BadRequestException("Cash Agent must be active");
          if (agent.countryCode !== input.countryCode || agent.environment !== input.environment)
            throw new BadRequestException("Cash Agent context does not match deposit");
          const [float, register, wallet] = await Promise.all([
            database.cashAgentFloatAccount.findUnique({
              where: {
                cashAgentId_currencyCode: {
                  cashAgentId: agent.id,
                  currencyCode: input.currencyCode,
                },
              },
            }),
            database.cashAgentCashRegister.findFirst({
              where: { cashAgentId: agent.id, currencyCode: input.currencyCode, status: "OPEN" },
            }),
            database.wallet.findUnique({
              where: { id: input.customerWalletId },
              include: { ownerUser: { include: { kycProfile: true } } },
            }),
          ]);
          if (float?.status !== "ACTIVE")
            throw new BadRequestException("Agent float is unavailable");
          if (register === null) throw new BadRequestException("An open cash register is required");
          if (
            wallet?.currencyCode !== input.currencyCode ||
            wallet.countryCode !== input.countryCode ||
            wallet.environment !== input.environment
          )
            throw new BadRequestException("Customer wallet context does not match deposit");
          if (
            wallet.status !== "ACTIVE" ||
            wallet.ownerUser?.status !== "ACTIVE" ||
            wallet.ownerUser.kycProfile?.status !== "APPROVED"
          )
            throw new BadRequestException("Customer wallet is not eligible for cash deposit");
          const balances = await database.ledgerEntry.groupBy({
            by: ["direction"],
            where: { accountId: float.ledgerAccountId, status: "POSTED" },
            _sum: { amount: true },
          });
          const total = (direction: "CREDIT" | "DEBIT") =>
            balances.find((item) => item.direction === direction)?._sum.amount ?? 0n;
          if (total("CREDIT") - total("DEBIT") < BigInt(input.amount))
            throw new BadRequestException("Insufficient Agent float");
          const deposit = await database.cashDeposit.create({
            data: {
              publicReference: `dep_${randomUUID().replaceAll("-", "")}`,
              cashAgentId: agent.id,
              cashRegisterId: register.id,
              customerWalletId: wallet.id,
              initiatedByUserId: userId,
              status: "PROCESSING",
              amount: BigInt(input.amount),
              currencyCode: input.currencyCode,
              countryCode: input.countryCode,
              environment: input.environment,
              idempotencyKey: input.idempotencyKey,
              requestHash,
              description: input.description,
            },
          });
          const ledgerTransaction = await this.ledger.postTransactionWithClient(
            database,
            {
              journalCode: "GENERAL",
              type: "AGENT_CASH_DEPOSIT",
              businessReference: deposit.publicReference,
              idempotencyKey: `cash-deposit:${input.idempotencyKey}`,
              currencyCode: input.currencyCode,
              countryCode: input.countryCode,
              environment: input.environment,
              description: input.description,
              correlationId: deposit.id,
              source: "cash-agent-service",
              effectiveAt: new Date().toISOString(),
              entries: [
                {
                  accountId: float.ledgerAccountId,
                  direction: "DEBIT",
                  amount: input.amount,
                  label: input.description,
                },
                {
                  accountId: wallet.ledgerAccountId,
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
          await database.cashAgentCashRegister.update({
            where: { id: register.id },
            data: {
              theoreticalAmount: { increment: BigInt(input.amount) },
              version: { increment: 1 },
            },
          });
          const completed = await database.cashDeposit.update({
            where: { id: deposit.id },
            data: {
              status: "COMPLETED",
              ledgerTransactionId: ledgerTransaction.id,
              completedAt: new Date(),
            },
          });
          await database.cashNetworkAudit.create({
            data: {
              cashAgentId: agent.id,
              actorUserId: userId,
              action: "agent.cash_deposit.complete",
              newValue: {
                depositId: completed.id,
                amount: input.amount,
                ledgerTransactionId: ledgerTransaction.id,
              },
            },
          });
          return this.serializeDeposit(completed);
        },
        { isolationLevel: "Serializable" },
      );
    } catch (error) {
      if (!isUniqueConstraintError(error)) throw error;
      const concurrent = await this.prisma.cashDeposit.findUnique({
        where: {
          environment_idempotencyKey: {
            environment: input.environment,
            idempotencyKey: input.idempotencyKey,
          },
        },
      });
      if (concurrent === null) throw error;
      if (concurrent.requestHash !== requestHash)
        throw new ConflictException("Idempotency key was already used with another request");
      return this.serializeDeposit(concurrent);
    }
  }

  listSelfTransactions(userId: string) {
    return Promise.all([
      this.prisma.cashDeposit.findMany({
        where: { initiatedBy: { id: userId } },
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
      this.prisma.cashWithdrawal.findMany({
        where: { initiatedBy: { id: userId } },
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
    ]).then(([deposits, withdrawals]) => ({
      deposits: deposits.map((item) => this.serializeDeposit(item)),
      withdrawals: withdrawals.map((item) => this.serializeWithdrawal(item)),
    }));
  }

  private serializeDeposit<T extends { amount: bigint }>(deposit: T) {
    return { ...deposit, amount: deposit.amount.toString() };
  }

  async authorizeCashWithdrawal(input: AuthorizeCashWithdrawalDto, userId: string) {
    return this.prisma.$transaction(
      async (database) => {
        const [agent, wallet] = await Promise.all([
          database.cashAgent.findUnique({ where: { publicReference: input.agentReference } }),
          database.wallet.findFirst({
            where: { id: input.customerWalletId, ownerUserId: userId },
            include: { ownerUser: { include: { kycProfile: true } } },
          }),
        ]);
        if (agent?.status !== "ACTIVE") throw new BadRequestException("Cash Agent is unavailable");
        if (agent.countryCode !== input.countryCode || agent.environment !== input.environment)
          throw new BadRequestException("Cash Agent context does not match withdrawal");
        if (
          wallet?.status !== "ACTIVE" ||
          wallet.currencyCode !== input.currencyCode ||
          wallet.countryCode !== input.countryCode ||
          wallet.environment !== input.environment
        )
          throw new BadRequestException("Customer wallet is not eligible for withdrawal");
        const kyc = wallet.ownerUser?.kycProfile;
        if (kyc?.status !== "APPROVED" || (kyc.expiresAt !== null && kyc.expiresAt <= new Date()))
          throw new BadRequestException("Customer KYC approval is required");
        const balances = await database.ledgerEntry.groupBy({
          by: ["direction"],
          where: { accountId: wallet.ledgerAccountId, status: "POSTED" },
          _sum: { amount: true },
        });
        const total = (direction: "CREDIT" | "DEBIT") =>
          balances.find((item) => item.direction === direction)?._sum.amount ?? 0n;
        if (total("CREDIT") - total("DEBIT") < BigInt(input.amount))
          throw new BadRequestException("Insufficient customer balance");
        const token = `wdr_${randomBytes(32).toString("base64url")}`;
        const authorization = await database.cashWithdrawalAuthorization.create({
          data: {
            cashAgentId: agent.id,
            customerWalletId: wallet.id,
            customerUserId: userId,
            tokenHash: createHash("sha256").update(token).digest("hex"),
            amount: BigInt(input.amount),
            currencyCode: input.currencyCode,
            countryCode: input.countryCode,
            environment: input.environment,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
          },
        });
        await database.cashNetworkAudit.create({
          data: {
            cashAgentId: agent.id,
            actorUserId: userId,
            action: "agent.cash_withdrawal.authorize",
            newValue: {
              authorizationId: authorization.id,
              amount: input.amount,
              expiresAt: authorization.expiresAt.toISOString(),
            },
          },
        });
        return {
          authorizationId: authorization.id,
          authorizationToken: token,
          amount: authorization.amount.toString(),
          expiresAt: authorization.expiresAt,
        };
      },
      { isolationLevel: "Serializable" },
    );
  }

  async executeCashWithdrawal(input: ExecuteCashWithdrawalDto, userId: string) {
    const tokenHash = createHash("sha256").update(input.authorizationToken).digest("hex");
    return this.prisma.$transaction(
      async (database) => {
        const authorization = await database.cashWithdrawalAuthorization.findUnique({
          where: { tokenHash },
          include: { withdrawal: true, cashAgent: true, customerWallet: true },
        });
        if (authorization === null)
          throw new BadRequestException("Invalid withdrawal authorization");
        if (
          authorization.cashAgent.ownerUserId !== userId ||
          authorization.cashAgent.status !== "ACTIVE"
        )
          throw new BadRequestException("Withdrawal authorization does not belong to this Agent");
        if (authorization.withdrawal !== null)
          return this.serializeWithdrawal(authorization.withdrawal);
        if (authorization.status !== "ACTIVE" || authorization.expiresAt <= new Date())
          throw new BadRequestException("Withdrawal authorization is no longer valid");
        const [float, register] = await Promise.all([
          database.cashAgentFloatAccount.findUnique({
            where: {
              cashAgentId_currencyCode: {
                cashAgentId: authorization.cashAgentId,
                currencyCode: authorization.currencyCode,
              },
            },
          }),
          database.cashAgentCashRegister.findFirst({
            where: {
              cashAgentId: authorization.cashAgentId,
              currencyCode: authorization.currencyCode,
              status: "OPEN",
            },
          }),
        ]);
        if (float?.status !== "ACTIVE") throw new BadRequestException("Agent float is unavailable");
        if (register === null || register.theoreticalAmount < authorization.amount)
          throw new BadRequestException("Insufficient Agent cash position");
        const walletBalances = await database.ledgerEntry.groupBy({
          by: ["direction"],
          where: { accountId: authorization.customerWallet.ledgerAccountId, status: "POSTED" },
          _sum: { amount: true },
        });
        const total = (direction: "CREDIT" | "DEBIT") =>
          walletBalances.find((item) => item.direction === direction)?._sum.amount ?? 0n;
        if (total("CREDIT") - total("DEBIT") < authorization.amount)
          throw new BadRequestException("Insufficient customer balance");
        const consumed = await database.cashWithdrawalAuthorization.updateMany({
          where: { id: authorization.id, status: "ACTIVE", expiresAt: { gt: new Date() } },
          data: { status: "CONSUMED", consumedAt: new Date() },
        });
        if (consumed.count !== 1)
          throw new ConflictException("Withdrawal authorization was already consumed");
        const requestHash = createHash("sha256")
          .update(JSON.stringify([authorization.id, input.description]))
          .digest("hex");
        const withdrawal = await database.cashWithdrawal.create({
          data: {
            publicReference: `wdr_${randomUUID().replaceAll("-", "")}`,
            authorizationId: authorization.id,
            cashAgentId: authorization.cashAgentId,
            cashRegisterId: register.id,
            customerWalletId: authorization.customerWalletId,
            initiatedByUserId: userId,
            status: "PROCESSING",
            amount: authorization.amount,
            currencyCode: authorization.currencyCode,
            countryCode: authorization.countryCode,
            environment: authorization.environment,
            idempotencyKey: input.idempotencyKey,
            requestHash,
            description: input.description,
          },
        });
        const ledgerTransaction = await this.ledger.postTransactionWithClient(
          database,
          {
            journalCode: "GENERAL",
            type: "AGENT_CASH_WITHDRAWAL",
            businessReference: withdrawal.publicReference,
            idempotencyKey: `cash-withdrawal:${input.idempotencyKey}`,
            currencyCode: authorization.currencyCode,
            countryCode: authorization.countryCode,
            environment: authorization.environment,
            description: input.description,
            correlationId: withdrawal.id,
            source: "cash-agent-service",
            effectiveAt: new Date().toISOString(),
            entries: [
              {
                accountId: authorization.customerWallet.ledgerAccountId,
                direction: "DEBIT",
                amount: authorization.amount.toString(),
                label: input.description,
              },
              {
                accountId: float.ledgerAccountId,
                direction: "CREDIT",
                amount: authorization.amount.toString(),
                label: input.description,
              },
            ],
          },
          userId,
        );
        if (ledgerTransaction === null)
          throw new ConflictException("Ledger transaction could not be reloaded");
        await database.cashAgentCashRegister.update({
          where: { id: register.id },
          data: {
            theoreticalAmount: { decrement: authorization.amount },
            version: { increment: 1 },
          },
        });
        const completed = await database.cashWithdrawal.update({
          where: { id: withdrawal.id },
          data: {
            status: "COMPLETED",
            ledgerTransactionId: ledgerTransaction.id,
            completedAt: new Date(),
          },
        });
        await database.cashNetworkAudit.create({
          data: {
            cashAgentId: authorization.cashAgentId,
            actorUserId: userId,
            action: "agent.cash_withdrawal.complete",
            newValue: {
              withdrawalId: completed.id,
              amount: authorization.amount.toString(),
              ledgerTransactionId: ledgerTransaction.id,
            },
          },
        });
        return this.serializeWithdrawal(completed);
      },
      { isolationLevel: "Serializable" },
    );
  }

  private serializeWithdrawal<T extends { amount: bigint }>(withdrawal: T) {
    return { ...withdrawal, amount: withdrawal.amount.toString(), cashReleaseAuthorized: true };
  }
}
