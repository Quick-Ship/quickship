import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

/*Local Imports */
import { WarehouseShipmentEntity } from './entities/warehouse-shipment.entity';
import { WarehouseShipmentService } from './warehouse-shipment.service';
import { WarehouseShipmentDTO } from './dto/warehouse-shipment.dto';
import { InputCreateWarehouseShipmentDTO } from './dto/create-warehouse-shipment.input';
import { InputUpdateWarehouseShipmentDTO } from './dto/update-warehouse-shipment.input';
import { WarehouseShipmentResolver } from './warehouse-shipment.resolver';

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
        },
      ],
    }),
  ],
  providers: [WarehouseShipmentResolver, WarehouseShipmentService],
  exports: [WarehouseShipmentService],
})
export class WarehouseShipmentModule {}
