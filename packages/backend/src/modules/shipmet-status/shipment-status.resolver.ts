import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';

/*Local Imports */
import { ShipmentStatusService } from './shipment-status.service';
import { ShipmentStatusDTO } from './dto/shipment-status.dto';

@Resolver(() => ShipmentStatusDTO)
export class ShipmentStatusResolver extends CRUDResolver(ShipmentStatusDTO) {
  constructor(readonly shipmentStatusService: ShipmentStatusService) {
    super(shipmentStatusService);
  }
}
