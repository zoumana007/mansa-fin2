import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
} from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ pattern: "^[a-z][a-z0-9._-]+$" })
  @Matches(/^[a-z][a-z0-9._-]+$/)
  @MaxLength(100)
  code!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 150)
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ type: [String], minItems: 1, maxItems: 100 })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @IsString({ each: true })
  permissionCodes!: string[];

  @ApiProperty()
  @IsString()
  @Length(3, 500)
  reason!: string;
}

export class CreateRoleAssignmentDto {
  @ApiProperty()
  @IsUUID()
  userId!: string;

  @ApiPropertyOptional({
    enum: ["GLOBAL", "SELF", "ORGANIZATION", "COUNTRY", "ENVIRONMENT", "RESOURCE"],
  })
  @IsOptional()
  @Matches(/^(GLOBAL|SELF|ORGANIZATION|COUNTRY|ENVIRONMENT|RESOURCE)$/)
  scopeType?: "GLOBAL" | "SELF" | "ORGANIZATION" | "COUNTRY" | "ENVIRONMENT" | "RESOURCE";

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  scopeId?: string;

  @ApiPropertyOptional({ pattern: "^[A-Z]{2}$" })
  @IsOptional()
  @Matches(/^[A-Z]{2}$/)
  countryCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  environment?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @ApiProperty()
  @IsString()
  @Length(3, 500)
  reason!: string;
}

export class RevokeRoleAssignmentDto {
  @ApiProperty()
  @IsString()
  @Length(3, 500)
  reason!: string;
}
