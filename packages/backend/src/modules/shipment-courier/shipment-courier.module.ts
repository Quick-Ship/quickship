import { Module, UseGuards } from '@nestjs/common';
import { ShipmentCourierService } from './shipment-courier.service';
import { ShipmentCourierResolver } from './shipment-courier.resolver';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ShipmentCourierEntity } from './entities/shipment-courier.entity';
import { ShipmentCourierDTO } from './dto/shipment-courier';
import { CreateShipmentCourierInput } from './dto/create-shipment-courier.input';
import { UpdateShipmentCourierInput } from './dto/update-shipment-courier.input';
import { GqlAuthGuard } from 'src/common/auth/auth.guard';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ShipmentCourierEntity])],
      services: [ShipmentCourierService],
      resolvers: [
        {
          delete: { disabled: true },
          DTOClass: ShipmentCourierDTO,
          EntityClass: ShipmentCourierEntity,
          CreateDTOClass: CreateShipmentCourierInput,
          UpdateDTOClass: UpdateShipmentCourierInput,
          read: {
            decorators: [UseGuards(GqlAuthGuard)],
          },
          update: { decorators: [UseGuards(GqlAuthGuard)] },
          create: { decorators: [UseGuards(GqlAuthGuard)] },
        },
      ],
    }),
  ],
  providers: [ShipmentCourierResolver, ShipmentCourierService],
  exports: [ShipmentCourierService],
})
export class ShipmentCourierModule {}
