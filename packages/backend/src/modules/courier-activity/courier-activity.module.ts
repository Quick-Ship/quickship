import { Module, UseGuards } from '@nestjs/common';
import { CourierActivityService } from './courier-activity.service';
import { CourierActivityResolver } from './courier-activity.resolver';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { CourierActivityEntity } from './entities/courier-activity.entity';
import { CourierActivityDTO } from './dtos/courier-activity.dto';
import { InputCreateCourierActivityDTO } from './dtos/create-courier-activity.dto';
import { InputUpdateCourierActivityDTO } from './dtos/update-courier-activity.dto';
import { GqlAuthGuard } from 'src/common/auth/auth.guard';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([CourierActivityEntity])],
      services: [CourierActivityService],
      resolvers: [
        {
          delete: { disabled: true },
          DTOClass: CourierActivityDTO,
          EntityClass: CourierActivityEntity,
          ServiceClass: CourierActivityService,
          CreateDTOClass: InputCreateCourierActivityDTO,
          UpdateDTOClass: InputUpdateCourierActivityDTO,
          read: {
            decorators: [UseGuards(GqlAuthGuard)],
          },
          update: { decorators: [UseGuards(GqlAuthGuard)] },
          create: { decorators: [UseGuards(GqlAuthGuard)] },
        },
      ],
    }),
  ],
  providers: [CourierActivityService, CourierActivityResolver],
})
export class CourierActivityModule {}
