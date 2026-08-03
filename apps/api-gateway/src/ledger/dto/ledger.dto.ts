import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  ValidateNested,
} from "class-validator";

const OWNER_TYPES = ["USER", "MERCHANT", "MANSA", "PARTNER", "TECHNICAL"] as const;
const ACCOUNT_TYPES = [
  "ASSET",
  "LIABILITY",
  "EQUITY",
  "REVENUE",
  "EXPENSE",
  "SUSPENSE",
  "SETTLEMENT",
  "FEE",
  "TAX",
  "RESERVE",
] as const;

export class CreateLedgerAccountDto {
  @ApiProperty()
  @Matches(/^led_acc_[A-Za-z0-9_-]{6,42}$/)
  publicReference!: string;

  @ApiProperty({ enum: OWNER_TYPES })
  @IsIn(OWNER_TYPES)
  ownerType!: (typeof OWNER_TYPES)[number];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  ownerId?: string;

  @ApiProperty({ enum: ACCOUNT_TYPES })
  @IsIn(ACCOUNT_TYPES)
  type!: (typeof ACCOUNT_TYPES)[number];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  subtype?: string;

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

  @ApiProperty({ enum: ["DEBIT", "CREDIT"] })
  @IsIn(["DEBIT", "CREDIT"])
  normalBalance!: "DEBIT" | "CREDIT";

  @ApiProperty()
  @IsString()
  @Length(3, 500)
  reason!: string;
}

export class LedgerEntryDto {
  @ApiProperty()
  @IsUUID()
  accountId!: string;

  @ApiProperty({ enum: ["DEBIT", "CREDIT"] })
  @IsIn(["DEBIT", "CREDIT"])
  direction!: "DEBIT" | "CREDIT";

  @ApiProperty({ description: "Montant entier exprimé dans l’unité monétaire minimale" })
  @Matches(/^[1-9]\d*$/)
  amount!: string;

  @ApiProperty()
  @IsString()
  @Length(1, 300)
  label!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  reference?: string;
}

export class PostLedgerTransactionDto {
  @ApiProperty()
  @Matches(/^[A-Z][A-Z0-9_]{1,49}$/)
  journalCode!: string;

  @ApiProperty()
  @Matches(/^[A-Z][A-Z0-9_]{1,99}$/)
  type!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  businessReference?: string;

  @ApiProperty()
  @IsString()
  @Length(8, 150)
  idempotencyKey!: string;

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
  @Length(3, 500)
  description!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  correlationId?: string;

  @ApiProperty()
  @IsString()
  @Length(2, 100)
  source!: string;

  @ApiProperty()
  @IsDateString()
  effectiveAt!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  parentId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;

  @ApiProperty({ type: [LedgerEntryDto], minItems: 2, maxItems: 100 })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => LedgerEntryDto)
  entries!: LedgerEntryDto[];
}
