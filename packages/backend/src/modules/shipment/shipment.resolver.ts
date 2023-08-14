import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards, ValidationPipe } from '@nestjs/common';

/*Local Imports */
import { ShipmentService } from './shipment.service';
import { ShipmentDTO } from './dto/shipment.dto';
import { InputGenerateShipmentDTO } from './dto/generate-shipment.dto';
import { InputAddPackageShipmentDTO } from './dto/add-packages-shipment.dto';
import { InputAssignCourierDTO } from './dto/assign-courier.dto';
import { InputOpenPackageDTO } from './dto/open-package.dto';
import { InputClosePackageDTO } from './dto/close-package.dto';
import { InputCancelPackageDTO } from './dto/cancel-package.dto';
import { GqlAuthGuard } from 'src/common/auth/auth.guard';
import { CurrentUser } from 'src/common/auth/current-user.decorator';
import { IPayloadUser } from 'src/common/auth/interfaces/auth.interface';

@Resolver(() => ShipmentDTO)
export class ShipmentResolver extends CRUDResolver(ShipmentDTO) {
  constructor(readonly shipmentService: ShipmentService) {
    super(shipmentService);
  }

  @Mutation(() => ShipmentDTO)
  @UseGuards(GqlAuthGuard)
  public async generateShipment(
    @Args('input', new ValidationPipe())
    input: InputGenerateShipmentDTO,
    @CurrentUser() user: IPayloadUser,
  ): Promise<ShipmentDTO> {
    return this.shipmentService.generateShipment(input, user);
  }

  @Mutation(() => ShipmentDTO)
  @UseGuards(GqlAuthGuard)
  public async addPackageShipment(
    @Args('input', new ValidationPipe())
    input: InputAddPackageShipmentDTO,
  ): Promise<ShipmentDTO> {
    return this.shipmentService.addPackageShipment(input);
  }

  @Mutation(() => ShipmentDTO)
  @UseGuards(GqlAuthGuard)
  public async assignCourierShipment(
    @Args('input', new ValidationPipe())
    input: InputAssignCourierDTO,
  ): Promise<ShipmentDTO> {
    return this.shipmentService.assignCourierShipment(input);
  }

  @Mutation(() => ShipmentDTO)
  @UseGuards(GqlAuthGuard)
  public async openPackage(
    @Args('input', new ValidationPipe())
    input: InputOpenPackageDTO,
  ): Promise<ShipmentDTO> {
    return this.shipmentService.openPackage(input);
  }

  @Mutation(() => ShipmentDTO)
  @UseGuards(GqlAuthGuard)
  public async closePackage(
    @Args('input', new ValidationPipe())
    input: InputClosePackageDTO,
  ): Promise<ShipmentDTO> {
    return this.shipmentService.closePackage(input);
  }

  @Mutation(() => ShipmentDTO)
  @UseGuards(GqlAuthGuard)
  public async cancelPackage(
    @Args('input', new ValidationPipe())
    input: InputCancelPackageDTO,
  ): Promise<ShipmentDTO> {
    return this.shipmentService.closePackage(input);
  }
}
