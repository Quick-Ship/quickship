import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

/*Local Imports */
import { MessengersService } from './messengers.service';
import { MessengersResolver } from './messengers.resolver';
import { MessengerEntity } from './entities/messenger.entity';
import { MessengerDTO } from './dto/messenger.dto';
import { InputCreateMessengerDTO } from './dto/create-messenger.input';
import { InputUpdateMessengerDTO } from './dto/update-messenger.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([MessengerEntity])],
      services: [MessengersService],
      resolvers: [
        {
          delete: { disabled: true },
          DTOClass: MessengerDTO,
          EntityClass: MessengerEntity,
          ServiceClass: MessengersService,
          CreateDTOClass: InputCreateMessengerDTO,
          UpdateDTOClass: InputUpdateMessengerDTO,
        },
      ],
    }),
  ],
  providers: [MessengersResolver, MessengersService],
  exports: [MessengersService],
})
export class MessengersModule {}
