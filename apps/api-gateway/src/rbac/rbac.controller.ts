import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { RequirePermissions } from "../security/access.decorators.js";
import type { AuthenticatedRequest } from "../security/authenticated-request.js";
import { CreateRoleAssignmentDto, CreateRoleDto, RevokeRoleAssignmentDto } from "./dto/rbac.dto.js";
import { RBAC_PERMISSIONS } from "./permissions.js";
import { RbacService } from "./rbac.service.js";

@ApiTags("administration-rbac")
@Controller("v1/admin")
export class RbacController {
  constructor(private readonly rbac: RbacService) {}

  @Get("permissions")
  @RequirePermissions(RBAC_PERMISSIONS.permissionRead)
  @ApiOkResponse()
  listPermissions() {
    return this.rbac.listPermissions();
  }

  @Get("roles")
  @RequirePermissions(RBAC_PERMISSIONS.roleRead)
  @ApiOkResponse()
  listRoles() {
    return this.rbac.listRoles();
  }

  @Post("roles")
  @RequirePermissions(RBAC_PERMISSIONS.roleCreate)
  @ApiCreatedResponse()
  createRole(@Body() input: CreateRoleDto, @Req() request: AuthenticatedRequest) {
    return this.rbac.createRole(input, request.authentication.userId);
  }

  @Post("roles/:roleId/assignments")
  @RequirePermissions(RBAC_PERMISSIONS.assignmentCreate)
  @ApiCreatedResponse()
  assignRole(
    @Param("roleId", new ParseUUIDPipe()) roleId: string,
    @Body() input: CreateRoleAssignmentDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.rbac.assignRole(roleId, input, request.authentication.userId);
  }

  @Delete("assignments/:assignmentId")
  @RequirePermissions(RBAC_PERMISSIONS.assignmentRevoke)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  revokeAssignment(
    @Param("assignmentId", new ParseUUIDPipe()) assignmentId: string,
    @Body() input: RevokeRoleAssignmentDto,
    @Req() request: AuthenticatedRequest,
  ): Promise<void> {
    return this.rbac.revokeAssignment(assignmentId, input.reason, request.authentication.userId);
  }
}
