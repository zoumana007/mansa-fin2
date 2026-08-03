import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { RequirePermissions, RequireSelfPermissions } from "../security/access.decorators.js";
import type { AuthenticatedRequest } from "../security/authenticated-request.js";
import { CreateInternalPaymentDto } from "./dto/payment.dto.js";
import { PaymentService } from "./payment.service.js";
import { PAYMENT_PERMISSIONS } from "./permissions.js";

@ApiTags("payments-internal")
@Controller("v1/payments")
export class PaymentController {
  constructor(private readonly payments: PaymentService) {}
  @Post("internal")
  @RequireSelfPermissions(PAYMENT_PERMISSIONS.selfCreate)
  @ApiCreatedResponse()
  createInternal(@Body() input: CreateInternalPaymentDto, @Req() request: AuthenticatedRequest) {
    return this.payments.createInternal(input, request.authentication.userId);
  }
  @Get("me")
  @RequireSelfPermissions(PAYMENT_PERMISSIONS.selfRead)
  @ApiOkResponse()
  listSelf(@Req() request: AuthenticatedRequest) {
    return this.payments.listSelf(request.authentication.userId);
  }
  @Get("me/:paymentId")
  @RequireSelfPermissions(PAYMENT_PERMISSIONS.selfRead)
  @ApiOkResponse()
  getSelf(
    @Param("paymentId", new ParseUUIDPipe()) id: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.payments.getSelf(id, request.authentication.userId);
  }
  @Get()
  @RequirePermissions(PAYMENT_PERMISSIONS.read)
  @ApiOkResponse()
  listAll() {
    return this.payments.listAll();
  }
  @Get("audit")
  @RequirePermissions(PAYMENT_PERMISSIONS.auditRead)
  @ApiOkResponse()
  listAudit() {
    return this.payments.listAudit();
  }
}
