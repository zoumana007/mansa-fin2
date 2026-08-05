import { Module } from "@nestjs/common";

import { PrismaService } from "../database/prisma.service.js";
import { AgentController } from "./agent.controller.js";
import { AgentService } from "./agent.service.js";

@Module({ controllers: [AgentController], providers: [AgentService, PrismaService] })
export class AgentModule {}
