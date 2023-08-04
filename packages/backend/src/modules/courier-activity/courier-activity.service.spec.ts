import { Test, TestingModule } from '@nestjs/testing';
import { CourierActivityService } from './courier-activity.service';

describe('CourierActivityService', () => {
  let service: CourierActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourierActivityService],
    }).compile();

    service = module.get<CourierActivityService>(CourierActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
