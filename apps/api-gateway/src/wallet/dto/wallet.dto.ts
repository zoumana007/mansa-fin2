import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsInt, IsObject, IsOptional, IsString, Length, Matches, Min } from "class-validator";

export class CreateSelfWalletDto {
  @ApiProperty({ enum: ["MAIN", "SECONDARY", "SAVINGS"] })
  @IsIn(["MAIN", "SECONDARY", "SAVINGS"])
  type!: "MAIN" | "SECONDARY" | "SAVINGS";

  @ApiProperty({ pattern: "^[A-Z]{3}$" })
  @Matches(/^[A-Z]{3}$/)
  currencyCode!: string;

  @ApiProperty({ pattern: "^[A-Z]{2}$" })
  @Matches(/^[A-Z]{2}$/)
  countryCode!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 30)
  environment!: string;
}

export class UpdateWalletStatusDto {
  @ApiProperty({ enum: ["ACTIVE", "LIMITED", "SUSPENDED", "FROZEN", "CLOSED"] })
  @IsIn(["ACTIVE", "LIMITED", "SUSPENDED", "FROZEN", "CLOSED"])
  status!: "ACTIVE" | "LIMITED" | "SUSPENDED" | "FROZEN" | "CLOSED";

  @ApiProperty()
  @IsString()
  @Length(3, 500)
  reason!: string;

  @ApiProperty({ minimum: 1 })
  @IsInt()
  @Min(1)
  expectedVersion!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  limits?: Record<string, unknown>;
}
