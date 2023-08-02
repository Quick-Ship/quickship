import { Module, UseGuards } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

/*Local Imports */
import { ShipmentStatusService } from './shipment-status.service';
import { ShipmentStatusResolver } from './shipment-status.resolver';
import { ShipmentStatusEntity } from './entities/shipment-status.entity';
import { ShipmentStatusDTO } from './dto/shipment-status.dto';
import { InputCreateShipmentStatusDTO } from './dto/create-shipment-status.input';
import { InputUpdateShipmentStatusDTO } from './dto/update-shipment-status.input';
import { GqlAuthGuard } from 'src/common/auth/auth.guard';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ShipmentStatusEntity])],
      services: [ShipmentStatusService],
      resolvers: [
        {
          delete: { disabled: true },
          DTOClass: ShipmentStatusDTO,
          EntityClass: ShipmentStatusEntity,
          ServiceClass: ShipmentStatusService,
          CreateDTOClass: InputCreateShipmentStatusDTO,
          UpdateDTOClass: InputUpdateShipmentStatusDTO,
          read: {
            decorators: [UseGuards(GqlAuthGuard)],
          },
          update: { decorators: [UseGuards(GqlAuthGuard)] },
          create: { decorators: [UseGuards(GqlAuthGuard)] },
        },
      ],
    }),
  ],
  providers: [ShipmentStatusResolver, ShipmentStatusService],
  exports: [ShipmentStatusService],
})
export class ShipmentStatusModule {}
