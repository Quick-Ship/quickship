import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentCourierResolver } from './shipment-courier.resolver';
import { ShipmentCourierService } from './shipment-courier.service';

describe('ShipmentCourierResolver', () => {
  let resolver: ShipmentCourierResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipmentCourierResolver, ShipmentCourierService],
    }).compile();

    resolver = module.get<ShipmentCourierResolver>(ShipmentCourierResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
