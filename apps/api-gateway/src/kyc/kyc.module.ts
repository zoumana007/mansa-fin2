import { Module } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service.js";
import { KycController } from "./kyc.controller.js";
import { KycService } from "./kyc.service.js";
@Module({ controllers: [KycController], providers: [KycService, PrismaService] })
export class KycModule {}
