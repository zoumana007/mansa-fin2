import { Module } from "@nestjs/common";

import { PrismaService } from "../database/prisma.service.js";
import { RbacController } from "./rbac.controller.js";
import { RbacService } from "./rbac.service.js";

@Module({ controllers: [RbacController], providers: [RbacService, PrismaService] })
export class RbacModule {}
