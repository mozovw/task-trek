import { IsString, IsOptional, IsInt, Min, Max, IsDateString, Length, IsArray } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @IsInt()
  @Min(1)
  @Max(3)
  level: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  estimatedMinutes?: number;

  @IsDateString()
  plannedDate: string;

  @IsOptional()
  @IsInt()
  parentId?: number;

  @IsOptional()
  @IsDateString()
  repeatUntilDate?: string;

  @IsOptional()
  @IsString()
  repeatSeriesId?: string;

  @IsOptional()
  @IsArray()
  repeatDays?: number[];
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @Length(1, 100)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  level?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  estimatedMinutes?: number;

  @IsOptional()
  @IsDateString()
  plannedDate?: string;

  @IsOptional()
  @IsInt()
  parentId?: number;

  @IsOptional()
  @IsDateString()
  repeatUntilDate?: string;

  @IsOptional()
  @IsString()
  repeatSeriesId?: string;

  @IsOptional()
  @IsArray()
  repeatDays?: number[];
}
