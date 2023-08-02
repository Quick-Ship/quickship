import { Module, UseGuards } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

/*Local Imports */
import { WarehouseShipmentEntity } from './entities/warehouse-shipment.entity';
import { WarehouseShipmentService } from './warehouse-shipment.service';
import { WarehouseShipmentDTO } from './dto/warehouse-shipment.dto';
import { InputCreateWarehouseShipmentDTO } from './dto/create-warehouse-shipment.input';
import { InputUpdateWarehouseShipmentDTO } from './dto/update-warehouse-shipment.input';
import { WarehouseShipmentResolver } from './warehouse-shipment.resolver';
import { GqlAuthGuard } from 'src/common/auth/auth.guard';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([WarehouseShipmentEntity])],
      services: [WarehouseShipmentService],
      resolvers: [
        {
          delete: { disabled: true },
          DTOClass: WarehouseShipmentDTO,
          EntityClass: WarehouseShipmentEntity,
          ServiceClass: WarehouseShipmentService,
          CreateDTOClass: InputCreateWarehouseShipmentDTO,
          UpdateDTOClass: InputUpdateWarehouseShipmentDTO,
          read: {
            decorators: [UseGuards(GqlAuthGuard)],
          },
          update: { decorators: [UseGuards(GqlAuthGuard)] },
          create: { decorators: [UseGuards(GqlAuthGuard)] },
        },
      ],
    }),
  ],
  providers: [WarehouseShipmentResolver, WarehouseShipmentService],
  exports: [WarehouseShipmentService],
})
export class WarehouseShipmentModule {}
