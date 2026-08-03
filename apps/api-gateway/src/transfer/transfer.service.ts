import { createHash, randomUUID } from "node:crypto";
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../database/prisma.service.js";
import { PaymentService } from "../payment/payment.service.js";
import type { CreateMansaTransferDto } from "./dto/transfer.dto.js";
import { isKycEligible } from "./transfer-policy.js";

function requestHash(
  input: Omit<CreateMansaTransferDto, "message"> & { message: string | undefined },
): string {
  return createHash("sha256")
    .update(
      JSON.stringify([
        input.senderWalletId,
        input.recipientHandle,
        input.amount,
        input.currencyCode,
        input.countryCode,
        input.environment,
        input.message,
      ]),
    )
    .digest("hex");
}

function uniqueError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
}

@Injectable()
export class TransferService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly payments: PaymentService,
  ) {}

  async createMansa(input: CreateMansaTransferDto, userId: string) {
    const normalizedHandle = input.recipientHandle.toLowerCase();
    const hash = requestHash({
      senderWalletId: input.senderWalletId,
      recipientHandle: normalizedHandle,
      amount: input.amount,
      currencyCode: input.currencyCode,
      countryCode: input.countryCode,
      environment: input.environment,
      idempotencyKey: input.idempotencyKey,
      message: input.message,
    });
    const existing = await this.findIdempotent(input.environment, input.idempotencyKey);
    if (existing !== null) return this.resolveIdempotent(existing, hash);

    const senderKyc = await this.prisma.kycProfile.findUnique({ where: { userId } });
    if (!isKycEligible(senderKyc?.status, senderKyc?.expiresAt))
      throw new ForbiddenException("Sender KYC approval is required");

    const recipient = await this.prisma.userProfile.findFirst({
      where: { OR: [{ username: normalizedHandle }, { mansaIdentifier: normalizedHandle }] },
      include: {
        user: {
          select: {
            kycProfile: { select: { status: true, expiresAt: true } },
            wallets: {
              where: {
                currencyCode: input.currencyCode,
                countryCode: input.countryCode,
                environment: input.environment,
                status: { in: ["ACTIVE", "LIMITED"] },
              },
              select: { id: true },
              take: 2,
            },
          },
        },
      },
    });
    if (recipient === null || recipient.userId === userId)
      throw new NotFoundException("Recipient not found");
    if (!isKycEligible(recipient.user.kycProfile?.status, recipient.user.kycProfile?.expiresAt))
      throw new BadRequestException("Recipient KYC approval is required");
    const [recipientWallet] = recipient.user.wallets;
    if (recipient.user.wallets.length !== 1 || recipientWallet === undefined)
      throw new BadRequestException("A unique compatible recipient wallet is required");

    const payment = await this.payments.createInternal(
      {
        payerWalletId: input.senderWalletId,
        payeeWalletId: recipientWallet.id,
        amount: input.amount,
        currencyCode: input.currencyCode,
        countryCode: input.countryCode,
        environment: input.environment,
        idempotencyKey: `transfer:${input.idempotencyKey}`,
        description: input.message ?? `Transfert vers ${recipient.mansaIdentifier}`,
      },
      userId,
    );

    try {
      const transfer = await this.prisma.$transaction(async (database) => {
        const created = await database.transfer.create({
          data: {
            publicReference: `trf_${randomUUID().replaceAll("-", "")}`,
            status: "COMPLETED",
            paymentId: payment.id,
            senderWalletId: input.senderWalletId,
            recipientUserId: recipient.userId,
            recipientHandle: normalizedHandle,
            amount: BigInt(input.amount),
            currencyCode: input.currencyCode,
            countryCode: input.countryCode,
            environment: input.environment,
            idempotencyKey: input.idempotencyKey,
            requestHash: hash,
            message: input.message ?? null,
            initiatedByUserId: userId,
            completedAt: new Date(),
          },
        });
        await database.transferAudit.create({
          data: {
            transferId: created.id,
            actorUserId: userId,
            action: "transfer.mansa.complete",
            details: { paymentId: payment.id, recipientUserId: recipient.userId },
          },
        });
        return created;
      });
      return this.serialize(transfer);
    } catch (error) {
      if (!uniqueError(error)) throw error;
      const concurrent = await this.findIdempotent(input.environment, input.idempotencyKey);
      if (concurrent === null) throw error;
      return this.resolveIdempotent(concurrent, hash);
    }
  }

  listSelf(userId: string) {
    return this.prisma.transfer
      .findMany({ where: { initiatedByUserId: userId }, orderBy: { createdAt: "desc" }, take: 100 })
      .then((items) => items.map((item) => this.serialize(item)));
  }
  listAll() {
    return this.prisma.transfer
      .findMany({ orderBy: { createdAt: "desc" }, take: 100 })
      .then((items) => items.map((item) => this.serialize(item)));
  }
  listAudit() {
    return this.prisma.transferAudit.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  }
  async getSelf(id: string, userId: string) {
    const item = await this.prisma.transfer.findFirst({ where: { id, initiatedByUserId: userId } });
    if (item === null) throw new NotFoundException("Transfer not found");
    return this.serialize(item);
  }
  private findIdempotent(environment: string, idempotencyKey: string) {
    return this.prisma.transfer.findUnique({
      where: { environment_idempotencyKey: { environment, idempotencyKey } },
    });
  }
  private resolveIdempotent<T extends { requestHash: string; amount: bigint }>(
    transfer: T,
    hash: string,
  ) {
    if (transfer.requestHash !== hash)
      throw new ConflictException("Idempotency key was already used with another request");
    return this.serialize(transfer);
  }
  private serialize<T extends { amount: bigint }>(transfer: T) {
    return { ...transfer, amount: transfer.amount.toString() };
  }
}
