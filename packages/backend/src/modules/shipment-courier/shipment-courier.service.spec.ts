import { Test, TestingModule } from '@nestjs/testing';
import { ShipmentCourierService } from './shipment-courier.service';

describe('ShipmentCourierService', () => {
  let service: ShipmentCourierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShipmentCourierService],
    }).compile();

    service = module.get<ShipmentCourierService>(ShipmentCourierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
