import { Module } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service.js";
import { LedgerModule } from "../ledger/ledger.module.js";
import { PaymentController } from "./payment.controller.js";
import { PaymentService } from "./payment.service.js";

@Module({
  imports: [LedgerModule],
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService],
  exports: [PaymentService],
})
export class PaymentModule {}
