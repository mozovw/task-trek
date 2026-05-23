import { IsString, IsNotEmpty, MaxLength, Allow } from 'class-validator';

export class UpdateNameDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}

export class UpdateWhiteNoiseDto {
  @Allow()
  whiteNoiseUrl: string | null;
}
