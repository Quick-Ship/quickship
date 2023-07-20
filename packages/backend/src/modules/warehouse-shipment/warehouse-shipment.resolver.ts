import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

/*Local Imports */
import { WarehouseShipmentDTO } from './dto/warehouse-shipment.dto';
import { WarehouseShipmentService } from './warehouse-shipment.service';
import { InputCreateWarehouseShipmentDTO } from './dto/create-warehouse-shipment.input';
import { ValidationPipe } from '@nestjs/common';

@Resolver(() => WarehouseShipmentDTO)
export class WarehouseShipmentResolver extends CRUDResolver(
  WarehouseShipmentDTO,
) {
  constructor(readonly warehouseShipmentService: WarehouseShipmentService) {
    super(warehouseShipmentService);
  }

  @Mutation(() => WarehouseShipmentDTO)
  public async createWarehouseShipment(
    @Args('input', new ValidationPipe())
    input: InputCreateWarehouseShipmentDTO,
  ): Promise<WarehouseShipmentDTO> {
    return this.warehouseShipmentService.createWarehouseShipment(input);
  }
}
