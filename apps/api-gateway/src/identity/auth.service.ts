import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { argon2id, hash, verify } from "argon2";

import { PrismaService } from "../database/prisma.service.js";
import type { DeviceDto, LoginDto, RegisterDto } from "./dto/auth.dto.js";
import { TokenService } from "./token.service.js";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: 900;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokens: TokenService,
  ) {}

  async register(input: RegisterDto): Promise<AuthTokens & { userId: string }> {
    const email = input.email.trim().toLowerCase();
    if (await this.prisma.user.findUnique({ where: { email }, select: { id: true } })) {
      throw new ConflictException("Unable to create account");
    }
    const passwordHash = await hash(input.password, {
      type: argon2id,
      memoryCost: 19_456,
      timeCost: 2,
      parallelism: 1,
    });
    const expiresAt = this.refreshExpiry();
    const result = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          countryCode: input.countryCode ?? null,
          authentication: { create: { type: "PASSWORD", secretHash: passwordHash } },
        },
      });
      const device = await tx.userDevice.create({ data: this.deviceData(user.id, input.device) });
      const session = await tx.userSession.create({
        data: {
          userId: user.id,
          deviceId: device.id,
          refreshTokenHash: "0".repeat(64),
          expiresAt,
          countryCode: input.countryCode ?? null,
        },
      });
      return { user, session };
    });
    return {
      userId: result.user.id,
      ...(await this.issue(result.user.id, result.session.id, input.countryCode)),
    };
  }

  async login(input: LoginDto): Promise<AuthTokens & { userId: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email.trim().toLowerCase() },
      include: { authentication: { where: { type: "PASSWORD" }, take: 1 } },
    });
    const credential = user?.authentication[0];
    if (!user || !credential || user.status === "SUSPENDED" || user.status === "CLOSED") {
      throw new UnauthorizedException("Invalid credentials");
    }
    if (user.lockedUntil && user.lockedUntil > new Date())
      throw new UnauthorizedException("Invalid credentials");
    if (!(await verify(credential.secretHash, input.password))) {
      await this.recordFailure(user.id, user.failedLoginAttempts + 1);
      throw new UnauthorizedException("Invalid credentials");
    }
    const deviceHash = this.tokens.hash(input.device.identifier);
    const device = await this.prisma.userDevice.upsert({
      where: { userId_deviceIdentifierHash: { userId: user.id, deviceIdentifierHash: deviceHash } },
      create: this.deviceData(user.id, input.device),
      update: {
        lastSeenAt: new Date(),
        applicationVersion: input.device.applicationVersion ?? null,
      },
    });
    const session = await this.prisma.userSession.create({
      data: {
        userId: user.id,
        deviceId: device.id,
        refreshTokenHash: "0".repeat(64),
        expiresAt: this.refreshExpiry(),
        countryCode: user.countryCode,
      },
    });
    await this.prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0, lockedUntil: null },
    });
    return {
      userId: user.id,
      ...(await this.issue(user.id, session.id, user.countryCode ?? undefined)),
    };
  }

  async refresh(token: string): Promise<AuthTokens> {
    const parsed = this.tokens.parseRefreshToken(token);
    if (!parsed) throw new UnauthorizedException("Invalid session");
    const session = await this.prisma.userSession.findUnique({ where: { id: parsed.sessionId } });
    if (session?.status !== "ACTIVE" || session.expiresAt <= new Date()) {
      throw new UnauthorizedException("Invalid session");
    }
    if (session.refreshTokenHash !== parsed.hash) {
      await this.prisma.userSession.update({
        where: { id: session.id },
        data: { status: "REVOKED", revokedAt: new Date() },
      });
      throw new UnauthorizedException("Invalid session");
    }
    return this.issue(session.userId, session.id, session.countryCode ?? undefined);
  }

  async logout(token: string): Promise<void> {
    const parsed = this.tokens.parseRefreshToken(token);
    if (!parsed) return;
    await this.prisma.userSession.updateMany({
      where: { id: parsed.sessionId, status: "ACTIVE" },
      data: { status: "REVOKED", revokedAt: new Date() },
    });
  }

  private async issue(
    userId: string,
    sessionId: string,
    countryCode?: string,
  ): Promise<AuthTokens> {
    const refresh = this.tokens.createRefreshToken(sessionId);
    await this.prisma.userSession.update({
      where: { id: sessionId },
      data: { refreshTokenHash: refresh.hash, lastActivityAt: new Date() },
    });
    return {
      accessToken: await this.tokens.createAccessToken(userId, sessionId, countryCode),
      refreshToken: refresh.token,
      expiresIn: 900,
    };
  }

  private deviceData(userId: string, device: DeviceDto) {
    return {
      userId,
      deviceIdentifierHash: this.tokens.hash(device.identifier),
      name: device.name ?? null,
      operatingSystem: device.operatingSystem ?? null,
      applicationVersion: device.applicationVersion ?? null,
    };
  }

  private refreshExpiry(): Date {
    return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  }

  private async recordFailure(userId: string, attempts: number): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: attempts,
        lockedUntil: attempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null,
      },
    });
  }
}
