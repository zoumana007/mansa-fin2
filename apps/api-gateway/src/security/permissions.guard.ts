import { ForbiddenException, Injectable } from "@nestjs/common";
import type { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

import { PrismaService } from "../database/prisma.service.js";
import { IS_PUBLIC_KEY, REQUIRED_PERMISSIONS_KEY } from "./access.decorators.js";
import { hasEveryPermission } from "./access-policy.js";
import type { AuthenticatedRequest } from "./authenticated-request.js";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
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
    const required =
      this.reflector.getAllAndOverride<string[] | undefined>(REQUIRED_PERMISSIONS_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? [];
    if (required.length === 0) throw new ForbiddenException("Permission policy is missing");

    const { userId } = context.switchToHttp().getRequest<AuthenticatedRequest>().authentication;
    const now = new Date();
    const assignments = await this.prisma.roleAssignment.findMany({
      where: {
        userId,
        scopeType: "GLOBAL",
        revokedAt: null,
        validFrom: { lte: now },
        OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
        role: { status: "ACTIVE" },
      },
      select: {
        role: { select: { permissions: { select: { permission: { select: { code: true } } } } } },
      },
    });
    const granted = new Set(
      assignments.flatMap(({ role }) => role.permissions.map(({ permission }) => permission.code)),
    );
    if (!hasEveryPermission(granted, required)) throw new ForbiddenException();
    return true;
  }
}
