import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { Request } from "express";

import { PrismaService } from "../database/prisma.service.js";
import { TokenService } from "../identity/token.service.js";
import { IS_PUBLIC_KEY } from "./access.decorators.js";
import type { AuthenticatedRequest } from "./authenticated-request.js";

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokens: TokenService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (
      this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ])
    )
      return true;
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers.authorization;
    if (!authorization?.startsWith("Bearer ")) throw new UnauthorizedException();

    try {
      const authentication = await this.tokens.verifyAccessToken(authorization.slice(7));
      const session = await this.prisma.userSession.findFirst({
        where: {
          id: authentication.sessionId,
          userId: authentication.userId,
          status: "ACTIVE",
          expiresAt: { gt: new Date() },
          revokedAt: null,
          user: { status: { in: ["ACTIVE", "PENDING_VERIFICATION"] } },
        },
        select: { id: true },
      });
      if (session === null) throw new UnauthorizedException();
      (request as AuthenticatedRequest).authentication = authentication;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
