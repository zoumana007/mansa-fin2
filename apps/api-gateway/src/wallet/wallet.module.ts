import { Module } from "@nestjs/common";

import { PrismaService } from "../database/prisma.service.js";
import { WalletController } from "./wallet.controller.js";
import { WalletService } from "./wallet.service.js";

@Module({ controllers: [WalletController], providers: [WalletService, PrismaService] })
export class WalletModule {}
