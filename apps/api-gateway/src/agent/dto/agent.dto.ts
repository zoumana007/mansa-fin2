import { ApiProperty } from "@nestjs/swagger";
import {
  IsIn,
  IsISO8601,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  Max,
  Min,
} from "class-validator";

export class CreateCashFeeRuleDto {
  @ApiProperty({ enum: ["DEPOSIT", "WITHDRAWAL"] })
  @IsIn(["DEPOSIT", "WITHDRAWAL"])
  operationType!: "DEPOSIT" | "WITHDRAWAL";

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

  @ApiProperty({ pattern: "^(0|[1-9][0-9]*)$" })
  @Matches(/^(0|[1-9][0-9]*)$/)
  fixedFeeAmount!: string;

  @ApiProperty({ minimum: 0, maximum: 10000 })
  @IsInt()
  @Min(0)
  @Max(10_000)
  variableFeeBps!: number;

  @IsOptional()
  @Matches(/^(0|[1-9][0-9]*)$/)
  minimumFeeAmount?: string;

  @IsOptional()
  @Matches(/^(0|[1-9][0-9]*)$/)
  maximumFeeAmount?: string;

  @ApiProperty({ minimum: 0, maximum: 10000 })
  @IsInt()
  @Min(0)
  @Max(10_000)
  agentCommissionBps!: number;

  @ApiProperty()
  @IsUUID()
  feeRevenueLedgerAccountId!: string;

  @ApiProperty()
  @IsUUID()
  commissionExpenseAccountId!: string;

  @ApiProperty()
  @IsISO8601()
  effectiveFrom!: string;

  @IsOptional()
  @IsISO8601()
  effectiveTo?: string;

  @ApiProperty()
  @IsString()
  @Length(3, 500)
  reason!: string;
}

export class QuoteCashFeeDto {
  @ApiProperty({ enum: ["DEPOSIT", "WITHDRAWAL"] })
  @IsIn(["DEPOSIT", "WITHDRAWAL"])
  operationType!: "DEPOSIT" | "WITHDRAWAL";

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

  @ApiProperty({ pattern: "^[1-9][0-9]*$" })
  @Matches(/^[1-9][0-9]*$/)
  amount!: string;
}

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

export class CreateCashDepositDto {
  @ApiProperty()
  @IsUUID()
  customerWalletId!: string;

  @ApiProperty({ description: "Montant entier dans l’unité minimale" })
  @Matches(/^[1-9]\d*$/)
  amount!: string;

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

  @ApiProperty()
  @IsString()
  @Length(8, 150)
  idempotencyKey!: string;

  @ApiProperty()
  @IsString()
  @Length(3, 500)
  description!: string;
}

export class AuthorizeCashWithdrawalDto {
  @ApiProperty()
  @IsUUID()
  customerWalletId!: string;

  @ApiProperty()
  @IsString()
  @Length(5, 50)
  agentReference!: string;

  @ApiProperty({ description: "Montant entier dans l’unité minimale" })
  @Matches(/^[1-9]\d*$/)
  amount!: string;

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

export class ExecuteCashWithdrawalDto {
  @ApiProperty()
  @IsString()
  @Length(40, 100)
  authorizationToken!: string;

  @ApiProperty()
  @IsString()
  @Length(8, 150)
  idempotencyKey!: string;

  @ApiProperty()
  @IsString()
  @Length(3, 500)
  description!: string;
}
