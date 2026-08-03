import { Module } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service.js";
import { NotificationController } from "./notification.controller.js";
import { NotificationService } from "./notification.service.js";

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, PrismaService],
  exports: [NotificationService],
})
export class NotificationModule {}
