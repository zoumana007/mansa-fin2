import { ApiProperty } from "@nestjs/swagger";
import {
  IsIn,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  Min,
} from "class-validator";

export class CreateCashAgentDto {
  @ApiProperty()
  @IsUUID()
  ownerUserId!: string;

  @ApiProperty({ enum: ["STANDARD", "PREMIUM", "PARTNER_BRANCH", "MANSA_BRANCH"] })
  @IsIn(["STANDARD", "PREMIUM", "PARTNER_BRANCH", "MANSA_BRANCH"])
  type!: "STANDARD" | "PREMIUM" | "PARTNER_BRANCH" | "MANSA_BRANCH";

  @ApiProperty({ pattern: "^[A-Z]{2}$" })
  @Matches(/^[A-Z]{2}$/)
  countryCode!: string;

  @ApiProperty({ pattern: "^[A-Z]{3}$" })
  @Matches(/^[A-Z]{3}$/)
  currencyCode!: string;

  @ApiProperty()
  @IsString()
  @Length(2, 30)
  environment!: string;

  @ApiProperty()
  @IsString()
  @Length(3, 500)
  reason!: string;
}

export class UpdateCashAgentStatusDto {
  @ApiProperty({ enum: ["ACTIVE", "SUSPENDED", "CLOSED"] })
  @IsIn(["ACTIVE", "SUSPENDED", "CLOSED"])
  status!: "ACTIVE" | "SUSPENDED" | "CLOSED";

  @ApiProperty()
  @IsString()
  @Length(3, 500)
  reason!: string;

  @ApiProperty({ minimum: 1 })
  @IsInt()
  @Min(1)
  expectedVersion!: number;
}

export class OpenCashRegisterDto {
  @ApiProperty({ pattern: "^[A-Z]{3}$" })
  @Matches(/^[A-Z]{3}$/)
  currencyCode!: string;

  @ApiProperty({ pattern: "^(0|[1-9][0-9]*)$" })
  @Matches(/^(0|[1-9][0-9]*)$/)
  openingAmount!: string;

  @IsOptional()
  @IsObject()
  denominations?: Record<string, unknown>;
}

export class DeclareCashRegisterDto {
  @ApiProperty({ pattern: "^(0|[1-9][0-9]*)$" })
  @Matches(/^(0|[1-9][0-9]*)$/)
  amount!: string;

  @IsOptional()
  @IsObject()
  denominations?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  @Length(3, 500)
  note?: string;
}

export class CloseCashRegisterDto extends DeclareCashRegisterDto {
  @ApiProperty()
  @IsString()
  @Length(3, 500)
  reason!: string;

  @ApiProperty({ minimum: 1 })
  @IsInt()
  @Min(1)
  expectedVersion!: number;
}
