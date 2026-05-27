import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { IngestionModule } from './ingestion/ingestion.module';

@Module({
  imports: [AuthModule, EventsModule, IngestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
