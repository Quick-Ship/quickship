import { Resolver } from '@nestjs/graphql';
import { ShipmentCourierService } from './shipment-courier.service';
import { ShipmentCourierDTO } from './dto/shipment-courier';
import { CRUDResolver } from '@nestjs-query/query-graphql';

@Resolver(() => ShipmentCourierDTO)
export class ShipmentCourierResolver extends CRUDResolver(ShipmentCourierDTO) {
  constructor(readonly repo: ShipmentCourierService) {
    super(repo);
  }
}
