import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { ContactService } from './contact.service';
import { ContactResolver } from './contact.resolver';
import { ContactEntity } from './entities/contact.entity';
import { ContactDTO } from './dto/contact.dto';
import { InputCreateContactDTO } from './dto/create-contact.input';
import { InputUpdateContactDTO } from './dto/update-contact.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ContactEntity])],
      services: [ContactService],
      resolvers: [
        {
          delete: { disabled: true },
          DTOClass: ContactDTO,
          EntityClass: ContactEntity,
          ServiceClass: ContactService,
          CreateDTOClass: InputCreateContactDTO,
          UpdateDTOClass: InputUpdateContactDTO,
        },
      ],
    }),
  ],
  providers: [ContactResolver, ContactService],
  exports: [ContactService],
})
export class ContactModule {}
