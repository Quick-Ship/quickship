import { Test, TestingModule } from '@nestjs/testing';
import { CourierActivityResolver } from './courier-activity.resolver';

describe('CourierActivityResolver', () => {
  let resolver: CourierActivityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourierActivityResolver],
    }).compile();

    resolver = module.get<CourierActivityResolver>(CourierActivityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
