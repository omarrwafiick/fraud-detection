import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RulesModule } from './rules/rules.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { TenantModule } from './tenant/tenant.module';
import { GraphModule } from './graph/graph.module';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [RulesModule, AnalyticsModule, TenantModule, GraphModule, AlertsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
