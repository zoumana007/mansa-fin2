import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsString, IsUUID, Length, Matches, Min } from "class-validator";

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
