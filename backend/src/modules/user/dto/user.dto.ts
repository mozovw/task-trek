import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateNameDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;
}
