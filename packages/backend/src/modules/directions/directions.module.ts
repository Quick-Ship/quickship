import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

/*Local Imports */
import { DirectionsService } from './directions.service';
import { DirectionsResolver } from './directions.resolver';
import { DirectionEntity } from './entities/direction.entity';
import { DirectionDTO } from './dto/directions.dto';
import { InputCreateDirectionDTO } from './dto/create-direction.input';
import { InputUpdateDirectionDTO } from './dto/update-direction.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([DirectionEntity])],
      services: [DirectionsService],
      resolvers: [
        {
          delete: { disabled: true },
          DTOClass: DirectionDTO,
          EntityClass: DirectionEntity,
          ServiceClass: DirectionsService,
          CreateDTOClass: InputCreateDirectionDTO,
          UpdateDTOClass: InputUpdateDirectionDTO,
        },
      ],
    }),
  ],
  providers: [DirectionsResolver, DirectionsService],
  exports: [DirectionsService],
})
export class DirectionModule {}
