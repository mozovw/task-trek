import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class UpdateNameDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}

export class UpdateWhiteNoiseDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  whiteNoiseUrl: string | null;
}
