import { Body, Controller, Get, Param, Put, Req } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { RequireSelfPermissions } from "../security/access.decorators.js";
import type { AuthenticatedRequest } from "../security/authenticated-request.js";
import { UpsertProfileDto } from "./dto/profile.dto.js";
import { PROFILE_PERMISSIONS } from "./permissions.js";
import { ProfileService } from "./profile.service.js";
@ApiTags("profile")
@Controller("v1/profiles")
export class ProfileController {
  constructor(private readonly profiles: ProfileService) {}
  @Get("me") @RequireSelfPermissions(PROFILE_PERMISSIONS.selfRead) @ApiOkResponse() getSelf(
    @Req() r: AuthenticatedRequest,
  ) {
    return this.profiles.getSelf(r.authentication.userId);
  }
  @Put("me") @RequireSelfPermissions(PROFILE_PERMISSIONS.selfWrite) upsert(
    @Body() i: UpsertProfileDto,
    @Req() r: AuthenticatedRequest,
  ) {
    return this.profiles.upsert(i, r.authentication.userId);
  }
  @Get("recipients/:handle") @RequireSelfPermissions(PROFILE_PERMISSIONS.recipientResolve) resolve(
    @Param("handle") h: string,
    @Req() r: AuthenticatedRequest,
  ) {
    return this.profiles.resolve(h.toLowerCase(), r.authentication.userId);
  }
}
