import { IsString, IsIn, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateCaseDto {
  @IsOptional()
  @IsString()
  @IsIn(['INVESTIGATING', 'RESOLVED', 'DISMISSED'])
  status: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  resolutionNotes: string;
}