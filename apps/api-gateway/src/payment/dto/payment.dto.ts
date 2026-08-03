import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, Length, Matches } from "class-validator";

export class CreateInternalPaymentDto {
  @ApiProperty() @IsUUID() payerWalletId!: string;
  @ApiProperty() @IsUUID() payeeWalletId!: string;
  @ApiProperty({ description: "Montant entier dans l’unité minimale" })
  @Matches(/^[1-9]\d*$/)
  amount!: string;
  @ApiProperty({ pattern: "^[A-Z]{3}$" }) @Matches(/^[A-Z]{3}$/) currencyCode!: string;
  @ApiProperty({ pattern: "^[A-Z]{2}$" }) @Matches(/^[A-Z]{2}$/) countryCode!: string;
  @ApiProperty() @IsString() @Length(2, 30) environment!: string;
  @ApiProperty() @IsString() @Length(8, 150) idempotencyKey!: string;
  @ApiProperty() @IsString() @Length(3, 500) description!: string;
}
