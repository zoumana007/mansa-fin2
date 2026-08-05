import { randomUUID } from "node:crypto";

import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../database/prisma.service.js";
import { calculateBalance } from "../ledger/ledger-policy.js";
import type { CreateCashAgentDto, UpdateCashAgentStatusDto } from "./dto/agent.dto.js";
import { canTransitionCashAgent } from "./agent-policy.js";

function isUniqueConstraintError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
}

@Injectable()
export class AgentService {
  constructor(private readonly prisma: PrismaService) {}

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
              type: "ASSET",
              subtype: "AGENT_FLOAT",
              currencyCode: input.currencyCode,
              countryCode: input.countryCode,
              environment: input.environment,
              normalBalance: "DEBIT",
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
}
