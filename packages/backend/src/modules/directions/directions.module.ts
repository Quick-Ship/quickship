import { Module, UseGuards } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

/*Local Imports */
import { DirectionsService } from './directions.service';
import { DirectionsResolver } from './directions.resolver';
import { DirectionEntity } from './entities/direction.entity';
import { DirectionDTO } from './dto/directions.dto';
import { InputCreateDirectionDTO } from './dto/create-direction.input';
import { InputUpdateDirectionDTO } from './dto/update-direction.input';
import { GqlAuthGuard } from 'src/common/auth/auth.guard';

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
          read: {
            decorators: [UseGuards(GqlAuthGuard)],
          },
          update: { decorators: [UseGuards(GqlAuthGuard)] },
          create: { decorators: [UseGuards(GqlAuthGuard)] },
        },
      ],
    }),
  ],
  providers: [DirectionsResolver, DirectionsService],
  exports: [DirectionsService],
})
export class DirectionModule {}
