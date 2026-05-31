import { Module } from '@nestjs/common';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rule } from './entities/rules.entity';
import { TenantModule } from 'src/tenant/tenant.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rule]), TenantModule],
  providers: [RulesService],
  controllers: [RulesController]
})
export class RulesModule {}
