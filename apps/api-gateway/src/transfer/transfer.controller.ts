import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { RequirePermissions, RequireSelfPermissions } from "../security/access.decorators.js";
import type { AuthenticatedRequest } from "../security/authenticated-request.js";
import { CreateMansaTransferDto } from "./dto/transfer.dto.js";
import { TRANSFER_PERMISSIONS } from "./permissions.js";
import { TransferService } from "./transfer.service.js";

@ApiTags("transfers")
@Controller("v1/transfers")
export class TransferController {
  constructor(private readonly transfers: TransferService) {}
  @Post("mansa")
  @RequireSelfPermissions(TRANSFER_PERMISSIONS.selfCreate)
  @ApiCreatedResponse()
  create(@Body() input: CreateMansaTransferDto, @Req() request: AuthenticatedRequest) {
    return this.transfers.createMansa(input, request.authentication.userId);
  }
  @Get("me")
  @RequireSelfPermissions(TRANSFER_PERMISSIONS.selfRead)
  @ApiOkResponse()
  listSelf(@Req() request: AuthenticatedRequest) {
    return this.transfers.listSelf(request.authentication.userId);
  }
  @Get("me/:transferId")
  @RequireSelfPermissions(TRANSFER_PERMISSIONS.selfRead)
  @ApiOkResponse()
  getSelf(
    @Param("transferId", new ParseUUIDPipe()) id: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.transfers.getSelf(id, request.authentication.userId);
  }
  @Get("audit")
  @RequirePermissions(TRANSFER_PERMISSIONS.auditRead)
  @ApiOkResponse()
  listAudit() {
    return this.transfers.listAudit();
  }
  @Get()
  @RequirePermissions(TRANSFER_PERMISSIONS.read)
  @ApiOkResponse()
  listAll() {
    return this.transfers.listAll();
  }
}
