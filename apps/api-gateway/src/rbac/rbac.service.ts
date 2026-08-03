import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../database/prisma.service.js";
import type { CreateRoleAssignmentDto, CreateRoleDto } from "./dto/rbac.dto.js";

@Injectable()
export class RbacService {
  constructor(private readonly prisma: PrismaService) {}

  listPermissions() {
    return this.prisma.permission.findMany({ orderBy: { code: "asc" } });
  }

  listRoles() {
    return this.prisma.role.findMany({
      orderBy: { code: "asc" },
      include: {
        permissions: { select: { permission: true } },
        _count: { select: { assignments: true } },
      },
    });
  }

  async createRole(input: CreateRoleDto, actorUserId: string) {
    const permissionCodes = [...new Set(input.permissionCodes)];
    const permissions = await this.prisma.permission.findMany({
      where: { code: { in: permissionCodes } },
      select: { id: true, code: true },
    });
    if (permissions.length !== permissionCodes.length)
      throw new BadRequestException("Unknown permission code");

    try {
      return await this.prisma.$transaction(async (transaction) => {
        const role = await transaction.role.create({
          data: {
            code: input.code,
            name: input.name,
            description: input.description ?? null,
            permissions: {
              create: permissions.map(({ id }) => ({ permission: { connect: { id } } })),
            },
          },
          include: { permissions: { select: { permission: true } } },
        });
        await transaction.accessAudit.create({
          data: {
            actorUserId,
            action: "rbac.role.create",
            targetType: "role",
            targetId: role.id,
            reason: input.reason,
            newValue: { code: role.code, permissionCodes },
          },
        });
        return role;
      });
    } catch (error) {
      if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002")
        throw new ConflictException("Role code already exists");
      throw error;
    }
  }

  async assignRole(roleId: string, input: CreateRoleAssignmentDto, actorUserId: string) {
    const expiresAt = input.expiresAt === undefined ? null : new Date(input.expiresAt);
    if (expiresAt !== null && expiresAt <= new Date())
      throw new BadRequestException("Expiration must be in the future");
    return this.prisma.$transaction(async (transaction) => {
      const role = await transaction.role.findUnique({
        where: { id: roleId },
        select: { status: true },
      });
      if (role === null) throw new NotFoundException("Role not found");
      if (role.status !== "ACTIVE")
        throw new BadRequestException("Archived roles cannot be assigned");
      const assignment = await transaction.roleAssignment.create({
        data: {
          userId: input.userId,
          roleId,
          scopeType: input.scopeType ?? "GLOBAL",
          scopeId: input.scopeId ?? null,
          countryCode: input.countryCode ?? null,
          environment: input.environment ?? null,
          expiresAt,
          reason: input.reason,
        },
      });
      await transaction.accessAudit.create({
        data: {
          actorUserId,
          action: "rbac.assignment.create",
          targetType: "role_assignment",
          targetId: assignment.id,
          reason: input.reason,
          newValue: { userId: input.userId, roleId, scopeType: assignment.scopeType },
        },
      });
      return assignment;
    });
  }

  async revokeAssignment(assignmentId: string, reason: string, actorUserId: string): Promise<void> {
    await this.prisma.$transaction(async (transaction) => {
      const assignment = await transaction.roleAssignment.findUnique({
        where: { id: assignmentId },
      });
      if (assignment === null) throw new NotFoundException("Role assignment not found");
      if (assignment.revokedAt !== null)
        throw new ConflictException("Role assignment already revoked");
      await transaction.roleAssignment.update({
        where: { id: assignmentId },
        data: { revokedAt: new Date() },
      });
      await transaction.accessAudit.create({
        data: {
          actorUserId,
          action: "rbac.assignment.revoke",
          targetType: "role_assignment",
          targetId: assignmentId,
          reason,
          previousValue: { roleId: assignment.roleId, userId: assignment.userId },
        },
      });
    });
  }
}
