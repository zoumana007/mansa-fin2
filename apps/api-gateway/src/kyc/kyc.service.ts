import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../database/prisma.service.js";
import type { ReviewKycDto, StartKycDto, SubmitKycDto } from "./dto/kyc.dto.js";
@Injectable()
export class KycService {
  constructor(private readonly prisma: PrismaService) {}
  getSelf(userId: string) {
    return this.prisma.kycProfile.findUnique({ where: { userId } });
  }
  async start(input: StartKycDto, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { countryCode: true },
    });
    if (user === null) throw new NotFoundException("User not found");
    if (user.countryCode !== null && user.countryCode !== input.countryCode)
      throw new BadRequestException("KYC country must match user country");
    return this.prisma.$transaction(async (tx) => {
      const profile = await tx.kycProfile.upsert({
        where: { userId },
        create: {
          userId,
          countryCode: input.countryCode,
          requestedLevel: input.requestedLevel,
          status: "IN_PROGRESS",
        },
        update: {
          requestedLevel: input.requestedLevel,
          status: "IN_PROGRESS",
          version: { increment: 1 },
        },
      });
      await tx.kycAudit.create({
        data: { profileId: profile.id, actorUserId: userId, action: "kyc.start" },
      });
      return profile;
    });
  }
  async submit(input: SubmitKycDto, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const profile = await tx.kycProfile.findUnique({ where: { userId } });
      if (profile === null) throw new NotFoundException("KYC profile not found");
      if (!["IN_PROGRESS", "ADDITIONAL_INFORMATION_REQUIRED", "REJECTED"].includes(profile.status))
        throw new ConflictException("KYC profile cannot be submitted");
      const updated = await tx.kycProfile.update({
        where: { id: profile.id },
        data: {
          status: "SUBMITTED",
          providerReference: input.providerReference,
          submittedAt: new Date(),
          decisionReason: null,
          version: { increment: 1 },
        },
      });
      await tx.kycAudit.create({
        data: { profileId: profile.id, actorUserId: userId, action: "kyc.submit" },
      });
      return updated;
    });
  }
  list() {
    return this.prisma.kycProfile.findMany({ orderBy: { updatedAt: "desc" }, take: 100 });
  }
  listAudit() {
    return this.prisma.kycAudit.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  }
  async review(id: string, input: ReviewKycDto, actorUserId: string) {
    return this.prisma.$transaction(async (tx) => {
      const profile = await tx.kycProfile.findUnique({ where: { id } });
      if (profile === null) throw new NotFoundException("KYC profile not found");
      if (!["SUBMITTED", "AUTOMATIC_REVIEW", "MANUAL_REVIEW"].includes(profile.status))
        throw new ConflictException("KYC profile is not reviewable");
      const level = input.decision === "APPROVED" ? profile.requestedLevel : profile.level;
      const updated = await tx.kycProfile.update({
        where: { id },
        data: {
          status: input.decision,
          level,
          decisionReason: input.reason,
          reviewedAt: new Date(),
          expiresAt: input.expiresAt === undefined ? null : new Date(input.expiresAt),
          version: { increment: 1 },
        },
      });
      if (input.decision === "APPROVED") {
        const walletLevel =
          level === "LEVEL_1" ? "BASIC" : level === "LEVEL_2" ? "VERIFIED" : "ENHANCED";
        await tx.wallet.updateMany({
          where: { ownerUserId: profile.userId, status: { not: "CLOSED" } },
          data: {
            verificationLevel: walletLevel,
            status: "LIMITED",
            statusReason: "KYC approved",
            version: { increment: 1 },
          },
        });
      }
      await tx.kycAudit.create({
        data: {
          profileId: id,
          actorUserId,
          action: `kyc.review.${input.decision.toLowerCase()}`,
          reason: input.reason,
          details: { level },
        },
      });
      return updated;
    });
  }
}
