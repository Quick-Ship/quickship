import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

/*Local Imports */
import { ShipmentService } from './shipment.service';
import { ShipmentResolver } from './shipment.resolver';
import { ShipmentEntity } from './entities/shipment.entity';
import { ShipmentDTO } from './dto/shipment.dto';
import { InputCreateShipmentDTO } from './dto/create-shipment.input';
import { InputUpdateShipmentDTO } from './dto/update-shipment.input';
import { DirectionModule } from '../directions/directions.module';
import { PackagesModule } from '../packages/packages.module';
import { ContactModule } from '../contact/contact.module';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([ShipmentEntity]),
        DirectionModule,
        PackagesModule,
        ContactModule,
      ],
      services: [ShipmentService],
      resolvers: [
        {
          delete: { disabled: true },
          DTOClass: ShipmentDTO,
          EntityClass: ShipmentEntity,
          ServiceClass: ShipmentService,
          CreateDTOClass: InputCreateShipmentDTO,
          UpdateDTOClass: InputUpdateShipmentDTO,
        },
      ],
    }),
  ],
  providers: [ShipmentResolver, ShipmentService],
  exports: [ShipmentService],
})
export class ShipmentModule {}
