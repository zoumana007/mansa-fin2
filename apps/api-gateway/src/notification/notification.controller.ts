import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Req } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { RequirePermissions, RequireSelfPermissions } from "../security/access.decorators.js";
import type { AuthenticatedRequest } from "../security/authenticated-request.js";
import { CreateNotificationDto } from "./dto/notification.dto.js";
import { NotificationService } from "./notification.service.js";
import { NOTIFICATION_PERMISSIONS } from "./permissions.js";

@ApiTags("notifications")
@Controller("v1/notifications")
export class NotificationController {
  constructor(private readonly notifications: NotificationService) {}
  @Get("me")
  @RequireSelfPermissions(NOTIFICATION_PERMISSIONS.selfRead)
  @ApiOkResponse()
  listSelf(@Req() request: AuthenticatedRequest) {
    return this.notifications.listSelf(request.authentication.userId);
  }
  @Get("me/:notificationId")
  @RequireSelfPermissions(NOTIFICATION_PERMISSIONS.selfRead)
  @ApiOkResponse()
  getSelf(
    @Param("notificationId", new ParseUUIDPipe()) id: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.notifications.getSelf(id, request.authentication.userId);
  }
  @Post("me/read-all")
  @RequireSelfPermissions(NOTIFICATION_PERMISSIONS.selfUpdate)
  @ApiOkResponse()
  markAllRead(@Req() request: AuthenticatedRequest) {
    return this.notifications.markAllRead(request.authentication.userId);
  }
  @Post("me/:notificationId/read")
  @RequireSelfPermissions(NOTIFICATION_PERMISSIONS.selfUpdate)
  @ApiOkResponse()
  markRead(
    @Param("notificationId", new ParseUUIDPipe()) id: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.notifications.markRead(id, request.authentication.userId);
  }
  @Post()
  @RequirePermissions(NOTIFICATION_PERMISSIONS.send)
  @ApiCreatedResponse()
  create(@Body() input: CreateNotificationDto, @Req() request: AuthenticatedRequest) {
    return this.notifications.create(input, request.authentication.userId);
  }
  @Get("audit")
  @RequirePermissions(NOTIFICATION_PERMISSIONS.auditRead)
  @ApiOkResponse()
  listAudit() {
    return this.notifications.listAudit();
  }
  @Get()
  @RequirePermissions(NOTIFICATION_PERMISSIONS.read)
  @ApiOkResponse()
  listAll() {
    return this.notifications.listAll();
  }
}
