import { createHash, randomUUID } from "node:crypto";
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../database/prisma.service.js";
import type { Prisma } from "../generated/prisma/client.js";
import type { CreateNotificationDto } from "./dto/notification.dto.js";

function hashRequest(input: CreateNotificationDto): string {
  return createHash("sha256")
    .update(
      JSON.stringify([
        input.recipientUserId,
        input.type,
        input.category,
        input.priority,
        input.sensitivity,
        input.title,
        input.body,
        input.locale,
        input.countryCode,
        input.environment,
        input.source,
        input.businessReference,
        input.correlationId,
        input.metadata,
        input.expiresAt,
      ]),
    )
    .digest("hex");
}

function uniqueError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
}

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateNotificationDto, actorUserId: string) {
    const expiresAt = input.expiresAt === undefined ? null : new Date(input.expiresAt);
    if (expiresAt !== null && expiresAt <= new Date())
      throw new BadRequestException("Notification expiry must be in the future");
    const hash = hashRequest(input);
    const existing = await this.findIdempotent(input.environment, input.idempotencyKey);
    if (existing !== null) return this.resolveIdempotent(existing, hash);
    try {
      return await this.prisma.$transaction(async (database) => {
        const recipient = await database.user.findUnique({
          where: { id: input.recipientUserId },
          select: { id: true },
        });
        if (recipient === null) throw new NotFoundException("Notification recipient not found");
        const notification = await database.notification.create({
          data: {
            publicReference: `ntf_${randomUUID().replaceAll("-", "")}`,
            recipientUserId: input.recipientUserId,
            type: input.type,
            category: input.category,
            priority: input.priority,
            sensitivity: input.sensitivity,
            title: input.title,
            body: input.body,
            locale: input.locale,
            countryCode: input.countryCode,
            environment: input.environment,
            idempotencyKey: input.idempotencyKey,
            requestHash: hash,
            source: input.source,
            businessReference: input.businessReference ?? null,
            correlationId: input.correlationId ?? null,
            ...(input.metadata === undefined
              ? {}
              : { metadata: input.metadata as Prisma.InputJsonValue }),
            expiresAt,
          },
        });
        await database.notificationAudit.create({
          data: {
            notificationId: notification.id,
            actorUserId,
            action: "notification.create",
            details: { category: input.category, priority: input.priority },
          },
        });
        return notification;
      });
    } catch (error) {
      if (!uniqueError(error)) throw error;
      const concurrent = await this.findIdempotent(input.environment, input.idempotencyKey);
      if (concurrent === null) throw error;
      return this.resolveIdempotent(concurrent, hash);
    }
  }

  async listSelf(userId: string) {
    await this.expireDue(userId);
    return this.prisma.notification.findMany({
      where: { recipientUserId: userId },
      orderBy: { createdAt: "desc" },
      take: 100,
    });
  }

  async getSelf(id: string, userId: string) {
    await this.expireDue(userId);
    const notification = await this.prisma.notification.findFirst({
      where: { id, recipientUserId: userId },
    });
    if (notification === null) throw new NotFoundException("Notification not found");
    return notification;
  }

  markRead(id: string, userId: string) {
    return this.prisma.$transaction(async (database) => {
      const notification = await database.notification.findFirst({
        where: { id, recipientUserId: userId },
      });
      if (notification === null) throw new NotFoundException("Notification not found");
      if (notification.status === "EXPIRED" || notification.status === "CANCELLED")
        throw new ConflictException("Notification cannot be marked as read");
      if (notification.status === "READ") return notification;
      const updated = await database.notification.update({
        where: { id },
        data: { status: "READ", readAt: new Date() },
      });
      await database.notificationAudit.create({
        data: { notificationId: id, actorUserId: userId, action: "notification.read" },
      });
      return updated;
    });
  }

  markAllRead(userId: string) {
    return this.prisma.$transaction(async (database) => {
      const unread = await database.notification.findMany({
        where: {
          recipientUserId: userId,
          status: "CREATED",
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
        },
        select: { id: true },
        take: 100,
      });
      if (unread.length === 0) return { updated: 0 };
      const ids = unread.map(({ id }) => id);
      const result = await database.notification.updateMany({
        where: { id: { in: ids } },
        data: { status: "READ", readAt: new Date() },
      });
      await database.notificationAudit.createMany({
        data: ids.map((notificationId) => ({
          notificationId,
          actorUserId: userId,
          action: "notification.read",
        })),
      });
      return { updated: result.count };
    });
  }

  listAll() {
    return this.prisma.notification.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  }
  listAudit() {
    return this.prisma.notificationAudit.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  }

  private expireDue(userId: string) {
    return this.prisma.$transaction(async (database) => {
      const expired = await database.notification.findMany({
        where: { recipientUserId: userId, status: "CREATED", expiresAt: { lte: new Date() } },
        select: { id: true },
        take: 100,
      });
      if (expired.length === 0) return { count: 0 };
      const ids = expired.map(({ id }) => id);
      const result = await database.notification.updateMany({
        where: { id: { in: ids } },
        data: { status: "EXPIRED" },
      });
      await database.notificationAudit.createMany({
        data: ids.map((notificationId) => ({
          notificationId,
          action: "notification.expire",
        })),
      });
      return result;
    });
  }
  private findIdempotent(environment: string, idempotencyKey: string) {
    return this.prisma.notification.findUnique({
      where: { environment_idempotencyKey: { environment, idempotencyKey } },
    });
  }
  private resolveIdempotent<T extends { requestHash: string }>(notification: T, hash: string) {
    if (notification.requestHash !== hash)
      throw new ConflictException("Idempotency key was already used with another request");
    return notification;
  }
}
