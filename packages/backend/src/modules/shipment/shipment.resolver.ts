import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ValidationPipe } from '@nestjs/common';

/*Local Imports */
import { ShipmentService } from './shipment.service';
import { ShipmentDTO } from './dto/shipment.dto';
import { InputGenerateShipmentDTO } from './dto/generate-shipment.dto';
import { InputAddPackageShipmentDTO } from './dto/add-packages-shipment.dto';
import { InputAssignCourierDTO } from './dto/assign-courier.dto';
import { InputOpenPackageDTO } from './dto/open-package.dto';

@Resolver(() => ShipmentDTO)
export class ShipmentResolver extends CRUDResolver(ShipmentDTO) {
  constructor(readonly shipmentService: ShipmentService) {
    super(shipmentService);
  }

  @Mutation(() => ShipmentDTO)
  public async generateShipment(
    @Args('input', new ValidationPipe())
    input: InputGenerateShipmentDTO,
  ): Promise<ShipmentDTO> {
    return this.shipmentService.generateShipment(input);
  }

  @Mutation(() => ShipmentDTO)
  public async addPackageShipment(
    @Args('input', new ValidationPipe())
    input: InputAddPackageShipmentDTO,
  ): Promise<ShipmentDTO> {
    return this.shipmentService.addPackageShipment(input);
  }

  @Mutation(() => ShipmentDTO)
  public async assignCourierShipment(
    @Args('input', new ValidationPipe())
    input: InputAssignCourierDTO,
  ): Promise<ShipmentDTO> {
    return this.shipmentService.assignCourierShipment(input);
  }

  @Mutation(() => ShipmentDTO)
  public async openPackage(
    @Args('input', new ValidationPipe())
    input: InputOpenPackageDTO,
  ): Promise<ShipmentDTO> {
    return this.shipmentService.openPackage(input);
  }
}
