import { Module, UseGuards } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

/*Local Import */
import { ClientService } from './client.service';
import { ClientResolver } from './client.resolver';
import { ClientEntity } from './entities/client.entity';
import { ClientDTO } from './dto/client.dto';
import { InputCreateClientDTO } from './dto/create-client.input';
import { InputUpdateClientDTO } from './dto/update-client.input';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import { GqlAuthGuard } from 'src/common/auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forFeature(appConfig),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ClientEntity])],
      services: [ClientService],
      resolvers: [
        {
          aggregate: { enabled: true },
          delete: { disabled: true },
          DTOClass: ClientDTO,
          EntityClass: ClientEntity,
          ServiceClass: ClientService,
          CreateDTOClass: InputCreateClientDTO,
          UpdateDTOClass: InputUpdateClientDTO,
          read: {
            one: {
              decorators: [UseGuards(GqlAuthGuard)],
            },
          },
        },
      ],
    }),
  ],
  providers: [ClientResolver, ClientService],
  exports: [ClientService],
})
export class ClientModule {}
