import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { RequirePermissions } from "../security/access.decorators.js";
import type { AuthenticatedRequest } from "../security/authenticated-request.js";
import { CreateLedgerAccountDto, PostLedgerTransactionDto } from "./dto/ledger.dto.js";
import { LEDGER_PERMISSIONS } from "./permissions.js";
import { LedgerService } from "./ledger.service.js";

@ApiTags("ledger-internal")
@Controller("v1/ledger")
export class LedgerController {
  constructor(private readonly ledger: LedgerService) {}

  @Post("accounts")
  @RequirePermissions(LEDGER_PERMISSIONS.accountCreate)
  @ApiCreatedResponse()
  createAccount(@Body() input: CreateLedgerAccountDto, @Req() request: AuthenticatedRequest) {
    return this.ledger.createAccount(input, request.authentication.userId);
  }

  @Get("accounts")
  @RequirePermissions(LEDGER_PERMISSIONS.accountRead)
  @ApiOkResponse()
  listAccounts() {
    return this.ledger.listAccounts();
  }

  @Get("accounts/:accountId")
  @RequirePermissions(LEDGER_PERMISSIONS.accountRead)
  @ApiOkResponse()
  getAccount(@Param("accountId", new ParseUUIDPipe()) accountId: string) {
    return this.ledger.getAccount(accountId);
  }

  @Get("accounts/:accountId/balance")
  @RequirePermissions(LEDGER_PERMISSIONS.accountRead)
  @ApiOkResponse()
  getBalance(@Param("accountId", new ParseUUIDPipe()) accountId: string) {
    return this.ledger.getBalance(accountId);
  }

  @Get("accounts/:accountId/entries")
  @RequirePermissions(LEDGER_PERMISSIONS.accountRead)
  @ApiOkResponse()
  getAccountEntries(@Param("accountId", new ParseUUIDPipe()) accountId: string) {
    return this.ledger.getAccountEntries(accountId);
  }

  @Post("transactions")
  @RequirePermissions(LEDGER_PERMISSIONS.transactionCreate)
  @ApiCreatedResponse()
  postTransaction(@Body() input: PostLedgerTransactionDto, @Req() request: AuthenticatedRequest) {
    return this.ledger.postTransaction(input, request.authentication.userId);
  }

  @Get("transactions/:transactionId")
  @RequirePermissions(LEDGER_PERMISSIONS.transactionRead)
  @ApiOkResponse()
  getTransaction(@Param("transactionId", new ParseUUIDPipe()) transactionId: string) {
    return this.ledger.getTransaction(transactionId);
  }

  @Get("audit")
  @RequirePermissions(LEDGER_PERMISSIONS.auditRead)
  @ApiOkResponse()
  listAudit() {
    return this.ledger.listAudit();
  }
}
