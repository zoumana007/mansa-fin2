import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsIn, IsOptional, IsString, Length, Matches } from "class-validator";
export class StartKycDto {
  @ApiProperty({ pattern: "^[A-Z]{2}$" }) @Matches(/^[A-Z]{2}$/) countryCode!: string;
  @ApiProperty({ enum: ["LEVEL_1", "LEVEL_2", "LEVEL_3"] })
  @IsIn(["LEVEL_1", "LEVEL_2", "LEVEL_3"])
  requestedLevel!: "LEVEL_1" | "LEVEL_2" | "LEVEL_3";
}
export class SubmitKycDto {
  @ApiProperty() @IsString() @Length(6, 150) providerReference!: string;
}
export class ReviewKycDto {
  @ApiProperty({ enum: ["APPROVED", "REJECTED", "ADDITIONAL_INFORMATION_REQUIRED", "SUSPENDED"] })
  @IsIn(["APPROVED", "REJECTED", "ADDITIONAL_INFORMATION_REQUIRED", "SUSPENDED"])
  decision!: "APPROVED" | "REJECTED" | "ADDITIONAL_INFORMATION_REQUIRED" | "SUSPENDED";
  @ApiProperty() @IsString() @Length(3, 500) reason!: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() expiresAt?: string;
}
