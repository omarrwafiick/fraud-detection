import { IsString, IsNotEmpty, IsObject, IsIn } from 'class-validator';

export class CreateRuleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  conditions: any;

  @IsString()
  @IsIn(['MEDIUM', 'HIGH', 'CRITICAL'])
  severity: string;
}