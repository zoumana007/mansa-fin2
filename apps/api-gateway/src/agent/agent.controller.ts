import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { RequirePermissions, RequireSelfPermissions } from "../security/access.decorators.js";
import type { AuthenticatedRequest } from "../security/authenticated-request.js";
import { AgentService } from "./agent.service.js";
import {
  CloseCashRegisterDto,
  CreateCashAgentDto,
  CreateCashDepositDto,
  DeclareCashRegisterDto,
  OpenCashRegisterDto,
  UpdateCashAgentStatusDto,
} from "./dto/agent.dto.js";
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

  @Post("agent/cash-register/open")
  @RequireSelfPermissions(AGENT_PERMISSIONS.cashRegisterOpen)
  @ApiCreatedResponse()
  openCashRegister(@Body() input: OpenCashRegisterDto, @Req() request: AuthenticatedRequest) {
    return this.agents.openCashRegister(input, request.authentication.userId);
  }

  @Post("agent/cash-register/declarations")
  @RequireSelfPermissions(AGENT_PERMISSIONS.cashRegisterDeclare)
  @ApiCreatedResponse()
  declareCash(@Body() input: DeclareCashRegisterDto, @Req() request: AuthenticatedRequest) {
    return this.agents.declareCash(input, request.authentication.userId);
  }

  @Post("agent/cash-register/close")
  @RequireSelfPermissions(AGENT_PERMISSIONS.cashRegisterClose)
  @ApiOkResponse()
  closeCashRegister(@Body() input: CloseCashRegisterDto, @Req() request: AuthenticatedRequest) {
    return this.agents.closeCashRegister(input, request.authentication.userId);
  }

  @Post("agent/deposits")
  @RequireSelfPermissions(AGENT_PERMISSIONS.depositCreate)
  @ApiCreatedResponse()
  createCashDeposit(@Body() input: CreateCashDepositDto, @Req() request: AuthenticatedRequest) {
    return this.agents.createCashDeposit(input, request.authentication.userId);
  }

  @Get("agent/transactions")
  @RequireSelfPermissions(AGENT_PERMISSIONS.transactionRead)
  @ApiOkResponse()
  listSelfTransactions(@Req() request: AuthenticatedRequest) {
    return this.agents.listSelfTransactions(request.authentication.userId);
  }
}
