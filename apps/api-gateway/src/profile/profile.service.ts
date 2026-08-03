import { randomUUID } from "node:crypto";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service.js";
import type { UpsertProfileDto } from "./dto/profile.dto.js";
import { maskFamilyName } from "./profile-policy.js";
const unique = (e: unknown) =>
  typeof e === "object" && e !== null && "code" in e && e.code === "P2002";
@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}
  getSelf(userId: string) {
    return this.prisma.userProfile.findUnique({ where: { userId } });
  }
  async upsert(input: UpsertProfileDto, userId: string) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const current = await tx.userProfile.findUnique({ where: { userId } });
        const profile = await tx.userProfile.upsert({
          where: { userId },
          create: {
            userId,
            mansaIdentifier: `mansa_${randomUUID().replaceAll("-", "").slice(0, 20)}`,
            username: input.username,
            firstName: input.firstName.trim(),
            lastName: input.lastName.trim(),
          },
          update: {
            username: input.username,
            firstName: input.firstName.trim(),
            lastName: input.lastName.trim(),
            version: { increment: 1 },
          },
        });
        await tx.userProfileAudit.create({
          data: {
            profileId: profile.id,
            actorUserId: userId,
            action: current === null ? "profile.create" : "profile.update",
          },
        });
        return profile;
      });
    } catch (e) {
      if (unique(e)) throw new ConflictException("Username already exists");
      throw e;
    }
  }
  async resolve(handle: string, userId: string) {
    const profile = await this.prisma.userProfile.findFirst({
      where: { OR: [{ username: handle }, { mansaIdentifier: handle }] },
      include: { user: { select: { kycProfile: { select: { status: true, level: true } } } } },
    });
    if (profile === null || profile.userId === userId)
      throw new NotFoundException("Recipient not found");
    return {
      mansaIdentifier: profile.mansaIdentifier,
      username: profile.username,
      firstName: profile.firstName,
      lastNameMasked: maskFamilyName(profile.lastName),
      verified: profile.user.kycProfile?.status === "APPROVED",
      verificationLevel: profile.user.kycProfile?.level ?? "LEVEL_0",
    };
  }
}
