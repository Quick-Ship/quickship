import { Module, UseGuards } from '@nestjs/common';
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
import { GqlAuthGuard } from 'src/common/auth/auth.guard';
import { ShipmentCourierModule } from '../shipment-courier/shipment-courier.module';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([ShipmentEntity]),
        DirectionModule,
        PackagesModule,
        ContactModule,
        ShipmentCourierModule,
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
          read: {
            decorators: [UseGuards(GqlAuthGuard)],
          },
          update: { decorators: [UseGuards(GqlAuthGuard)] },
          create: { decorators: [UseGuards(GqlAuthGuard)] },
        },
      ],
    }),
  ],
  providers: [ShipmentResolver, ShipmentService],
  exports: [ShipmentService],
})
export class ShipmentModule {}
