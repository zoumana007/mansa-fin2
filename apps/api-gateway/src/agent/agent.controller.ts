import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { RequirePermissions, RequireSelfPermissions } from "../security/access.decorators.js";
import type { AuthenticatedRequest } from "../security/authenticated-request.js";
import { AgentService } from "./agent.service.js";
import { CreateCashAgentDto, UpdateCashAgentStatusDto } from "./dto/agent.dto.js";
import { AGENT_PERMISSIONS } from "./permissions.js";

@ApiTags("cash-agent")
@Controller("v1")
export class AgentController {
  constructor(private readonly agents: AgentService) {}

  @Post("agents")
  @RequirePermissions(AGENT_PERMISSIONS.manage)
  @ApiCreatedResponse()
  create(@Body() input: CreateCashAgentDto, @Req() request: AuthenticatedRequest) {
    return this.agents.create(input, request.authentication.userId);
  }

  @Get("agents")
  @RequirePermissions(AGENT_PERMISSIONS.read)
  @ApiOkResponse()
  list() {
    return this.agents.list();
  }

  @Get("agents/:agentId")
  @RequirePermissions(AGENT_PERMISSIONS.read)
  @ApiOkResponse()
  get(@Param("agentId", new ParseUUIDPipe()) agentId: string) {
    return this.agents.get(agentId);
  }

  @Patch("agents/:agentId/status")
  @RequirePermissions(AGENT_PERMISSIONS.manage)
  @ApiOkResponse()
  updateStatus(
    @Param("agentId", new ParseUUIDPipe()) agentId: string,
    @Body() input: UpdateCashAgentStatusDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.agents.updateStatus(agentId, input, request.authentication.userId);
  }

  @Get("agent/float")
  @RequireSelfPermissions(AGENT_PERMISSIONS.selfFloatRead)
  @ApiOkResponse()
  getSelfFloat(@Req() request: AuthenticatedRequest) {
    return this.agents.getSelfFloat(request.authentication.userId);
  }

  @Get("agents-audit")
  @RequirePermissions(AGENT_PERMISSIONS.auditRead)
  @ApiOkResponse()
  listAudit() {
    return this.agents.listAudit();
  }
}
