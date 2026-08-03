import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Req } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { RequirePermissions, RequireSelfPermissions } from "../security/access.decorators.js";
import type { AuthenticatedRequest } from "../security/authenticated-request.js";
import { ReviewKycDto, StartKycDto, SubmitKycDto } from "./dto/kyc.dto.js";
import { KycService } from "./kyc.service.js";
import { KYC_PERMISSIONS } from "./permissions.js";
@ApiTags("kyc")
@Controller("v1/kyc")
export class KycController {
  constructor(private readonly kyc: KycService) {}
  @Get("me") @RequireSelfPermissions(KYC_PERMISSIONS.selfRead) @ApiOkResponse() getSelf(
    @Req() r: AuthenticatedRequest,
  ) {
    return this.kyc.getSelf(r.authentication.userId);
  }
  @Post("me/start") @RequireSelfPermissions(KYC_PERMISSIONS.selfWrite) start(
    @Body() i: StartKycDto,
    @Req() r: AuthenticatedRequest,
  ) {
    return this.kyc.start(i, r.authentication.userId);
  }
  @Post("me/submit") @RequireSelfPermissions(KYC_PERMISSIONS.selfWrite) submit(
    @Body() i: SubmitKycDto,
    @Req() r: AuthenticatedRequest,
  ) {
    return this.kyc.submit(i, r.authentication.userId);
  }
  @Get() @RequirePermissions(KYC_PERMISSIONS.read) list() {
    return this.kyc.list();
  }
  @Post(":id/review") @RequirePermissions(KYC_PERMISSIONS.review) review(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() i: ReviewKycDto,
    @Req() r: AuthenticatedRequest,
  ) {
    return this.kyc.review(id, i, r.authentication.userId);
  }
  @Get("audit") @RequirePermissions(KYC_PERMISSIONS.auditRead) listAudit() {
    return this.kyc.listAudit();
  }
}
