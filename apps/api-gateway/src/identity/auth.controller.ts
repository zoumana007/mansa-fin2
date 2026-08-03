import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";

import { AuthService } from "./auth.service.js";
import { LoginDto, LogoutDto, RefreshDto, RegisterDto } from "./dto/auth.dto.js";
import { Public } from "../security/access.decorators.js";

@ApiTags("identity")
@Public()
@Controller("v1/auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post("register")
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ApiCreatedResponse()
  register(@Body() input: RegisterDto) {
    return this.auth.register(input);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @ApiOkResponse()
  login(@Body() input: LoginDto) {
    return this.auth.login(input);
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  refresh(@Body() input: RefreshDto) {
    return this.auth.refresh(input.refreshToken);
  }

  @Post("logout")
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Body() input: LogoutDto): Promise<void> {
    await this.auth.logout(input.refreshToken);
  }
}
