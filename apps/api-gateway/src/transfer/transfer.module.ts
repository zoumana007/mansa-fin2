import { Module } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service.js";
import { PaymentModule } from "../payment/payment.module.js";
import { TransferController } from "./transfer.controller.js";
import { TransferService } from "./transfer.service.js";

@Module({
  imports: [PaymentModule],
  controllers: [TransferController],
  providers: [TransferService, PrismaService],
})
export class TransferModule {}
