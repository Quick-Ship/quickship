import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/*Local Imports */
import { ContactEntity } from './entities/contact.entity';

@QueryService(ContactEntity)
export class ContactService extends TypeOrmQueryService<ContactEntity> {
  constructor(
    @InjectRepository(ContactEntity) repo: Repository<ContactEntity>,
  ) {
    super(repo);
  }
}
