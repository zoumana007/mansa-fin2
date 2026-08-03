import { Module } from "@nestjs/common";

import { PrismaService } from "../database/prisma.service.js";
import { LedgerController } from "./ledger.controller.js";
import { LedgerService } from "./ledger.service.js";

@Module({
  controllers: [LedgerController],
  providers: [LedgerService, PrismaService],
  exports: [LedgerService],
})
export class LedgerModule {}
