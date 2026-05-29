import { Module } from '@nestjs/common';
import { SyncCheckController } from './sync-check.controller';

@Module({
  controllers: [SyncCheckController]
})
export class SyncCheckModule {}
