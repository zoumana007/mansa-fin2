import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { RequirePermissions, RequireSelfPermissions } from "../security/access.decorators.js";
import type { AuthenticatedRequest } from "../security/authenticated-request.js";
import { CreateSelfWalletDto, UpdateWalletStatusDto } from "./dto/wallet.dto.js";
import { WALLET_PERMISSIONS } from "./permissions.js";
import { WalletService } from "./wallet.service.js";

@ApiTags("wallet")
@Controller("v1/wallets")
export class WalletController {
  constructor(private readonly wallets: WalletService) {}

  @Post("me")
  @RequireSelfPermissions(WALLET_PERMISSIONS.selfCreate)
  @ApiCreatedResponse()
  createSelf(@Body() input: CreateSelfWalletDto, @Req() request: AuthenticatedRequest) {
    return this.wallets.createSelf(input, request.authentication.userId);
  }

  @Get("me")
  @RequireSelfPermissions(WALLET_PERMISSIONS.selfRead)
  @ApiOkResponse()
  listSelf(@Req() request: AuthenticatedRequest) {
    return this.wallets.listSelf(request.authentication.userId);
  }

  @Get("me/:walletId")
  @RequireSelfPermissions(WALLET_PERMISSIONS.selfRead)
  @ApiOkResponse()
  getSelf(
    @Param("walletId", new ParseUUIDPipe()) walletId: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.wallets.getSelf(walletId, request.authentication.userId);
  }

  @Get("me/:walletId/balance")
  @RequireSelfPermissions(WALLET_PERMISSIONS.selfRead)
  @ApiOkResponse()
  getSelfBalance(
    @Param("walletId", new ParseUUIDPipe()) walletId: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.wallets.getSelfBalance(walletId, request.authentication.userId);
  }

  @Get("me/:walletId/history")
  @RequireSelfPermissions(WALLET_PERMISSIONS.selfRead)
  @ApiOkResponse()
  getSelfHistory(
    @Param("walletId", new ParseUUIDPipe()) walletId: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.wallets.getSelfHistory(walletId, request.authentication.userId);
  }

  @Get()
  @RequirePermissions(WALLET_PERMISSIONS.read)
  @ApiOkResponse()
  listAll() {
    return this.wallets.listAll();
  }

  @Patch(":walletId/status")
  @RequirePermissions(WALLET_PERMISSIONS.statusManage)
  @ApiOkResponse()
  updateStatus(
    @Param("walletId", new ParseUUIDPipe()) walletId: string,
    @Body() input: UpdateWalletStatusDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.wallets.updateStatus(walletId, input, request.authentication.userId);
  }

  @Get("audit")
  @RequirePermissions(WALLET_PERMISSIONS.auditRead)
  @ApiOkResponse()
  listAudit() {
    return this.wallets.listAudit();
  }
}
