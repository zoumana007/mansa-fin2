import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID, Length, Matches } from "class-validator";

export class CreateMansaTransferDto {
  @ApiProperty() @IsUUID() senderWalletId!: string;
  @ApiProperty({ description: "Identifiant Mansa ou nom d’utilisateur" })
  @IsString()
  @Length(3, 30)
  @Matches(/^[a-z0-9_.-]+$/)
  recipientHandle!: string;
  @ApiProperty({ description: "Montant entier dans l’unité minimale" })
  @Matches(/^[1-9]\d*$/)
  amount!: string;
  @ApiProperty({ pattern: "^[A-Z]{3}$" }) @Matches(/^[A-Z]{3}$/) currencyCode!: string;
  @ApiProperty({ pattern: "^[A-Z]{2}$" }) @Matches(/^[A-Z]{2}$/) countryCode!: string;
  @ApiProperty() @IsString() @Length(2, 30) environment!: string;
  @ApiProperty() @IsString() @Length(8, 150) idempotencyKey!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @Length(1, 280) message?: string;
}
