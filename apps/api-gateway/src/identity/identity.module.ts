import { Module } from "@nestjs/common";

import { PrismaService } from "../database/prisma.service.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import { TokenService } from "./token.service.js";

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService, PrismaService],
  exports: [TokenService],
})
export class IdentityModule {}
