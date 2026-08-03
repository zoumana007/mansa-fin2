import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsIn,
  IsISO8601,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
} from "class-validator";

const categories = [
  "SECURITY",
  "TRANSACTION",
  "COMPLIANCE",
  "SERVICE",
  "REMINDER",
  "INFORMATION",
  "PROMOTION",
  "ADMINISTRATION",
] as const;
const priorities = ["LOW", "NORMAL", "HIGH", "CRITICAL"] as const;
const sensitivities = ["PUBLIC", "PRIVATE", "SENSITIVE"] as const;

export class CreateNotificationDto {
  @ApiProperty() @IsUUID() recipientUserId!: string;
  @ApiProperty() @IsString() @Length(3, 150) @Matches(/^[a-z0-9_.-]+$/) type!: string;
  @ApiProperty({ enum: categories }) @IsIn(categories) category!: (typeof categories)[number];
  @ApiProperty({ enum: priorities }) @IsIn(priorities) priority!: (typeof priorities)[number];
  @ApiProperty({ enum: sensitivities })
  @IsIn(sensitivities)
  sensitivity!: (typeof sensitivities)[number];
  @ApiProperty() @IsString() @Length(1, 150) title!: string;
  @ApiProperty() @IsString() @Length(1, 500) body!: string;
  @ApiProperty({ example: "fr-FR" }) @Matches(/^[a-z]{2}(?:-[A-Z]{2})?$/) locale!: string;
  @ApiProperty({ pattern: "^[A-Z]{2}$" }) @Matches(/^[A-Z]{2}$/) countryCode!: string;
  @ApiProperty() @IsString() @Length(2, 30) environment!: string;
  @ApiProperty() @IsString() @Length(8, 150) idempotencyKey!: string;
  @ApiProperty() @IsString() @Length(2, 100) source!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(1, 100) businessReference?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(1, 100) correlationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsObject() metadata?: Record<string, unknown>;
  @ApiPropertyOptional() @IsOptional() @IsISO8601({ strict: true }) expiresAt?: string;
}
