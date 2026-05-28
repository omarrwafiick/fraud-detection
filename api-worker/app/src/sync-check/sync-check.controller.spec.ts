import { Test, TestingModule } from '@nestjs/testing';
import { SyncCheckController } from './sync-check.controller';

describe('SyncCheckController', () => {
  let controller: SyncCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SyncCheckController],
    }).compile();

    controller = module.get<SyncCheckController>(SyncCheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
