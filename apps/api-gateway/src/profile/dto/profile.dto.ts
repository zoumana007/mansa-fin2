import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, Matches } from "class-validator";
export class UpsertProfileDto {
  @ApiProperty() @Matches(/^[a-z][a-z0-9_]{2,29}$/) username!: string;
  @ApiProperty() @IsString() @Length(1, 100) firstName!: string;
  @ApiProperty() @IsString() @Length(1, 100) lastName!: string;
}
