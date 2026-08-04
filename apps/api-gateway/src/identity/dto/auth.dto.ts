import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  ValidateNested,
} from "class-validator";

export class DeviceDto {
  @ApiProperty({ minLength: 16, maxLength: 200 })
  @IsString()
  @Length(16, 200)
  identifier!: string;

  @ApiPropertyOptional({ maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({ maxLength: 100 })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  operatingSystem?: string;

  @ApiPropertyOptional({ maxLength: 50 })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  applicationVersion?: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  @MaxLength(320)
  email!: string;

  @ApiProperty({ minLength: 12, maxLength: 128 })
  @IsString()
  @Length(12, 128)
  @Matches(/[a-z]/, { message: "password must contain a lowercase letter" })
  @Matches(/[A-Z]/, { message: "password must contain an uppercase letter" })
  @Matches(/[0-9]/, { message: "password must contain a digit" })
  password!: string;

  @ApiProperty({ type: DeviceDto })
  @ValidateNested()
  @Type(() => DeviceDto)
  device!: DeviceDto;

  @ApiPropertyOptional({ pattern: "^[A-Z]{2}$" })
  @IsOptional()
  @Matches(/^[A-Z]{2}$/)
  countryCode?: string;
}

export class LoginDto extends RegisterDto {}

export class RefreshDto {
  @ApiProperty()
  @IsString()
  @Length(40, 300)
  refreshToken!: string;
}

export class LogoutDto extends RefreshDto {}
