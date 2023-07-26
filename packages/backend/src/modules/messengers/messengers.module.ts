import { Module, UseGuards } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

/*Local Imports */
import { MessengersService } from './messengers.service';
import { MessengersResolver } from './messengers.resolver';
import { MessengerEntity } from './entities/messenger.entity';
import { MessengerDTO } from './dto/messenger.dto';
import { InputCreateMessengerDTO } from './dto/create-messenger.input';
import { InputUpdateMessengerDTO } from './dto/update-messenger.input';
import { FireBaseModule } from 'src/common/firebase/firebase.module';
import { GqlAuthGuard } from 'src/common/auth/auth.guard';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([MessengerEntity]),
        FireBaseModule,
      ],
      services: [MessengersService],
      resolvers: [
        {
          delete: { disabled: true },
          create: { disabled: true },
          DTOClass: MessengerDTO,
          EntityClass: MessengerEntity,
          ServiceClass: MessengersService,
          CreateDTOClass: InputCreateMessengerDTO,
          UpdateDTOClass: InputUpdateMessengerDTO,
          read: {
            decorators: [UseGuards(GqlAuthGuard)],
          },
          update: { decorators: [UseGuards(GqlAuthGuard)] },
        },
      ],
    }),
  ],
  providers: [MessengersResolver, MessengersService],
  exports: [MessengersService],
})
export class MessengersModule {}
