import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/*Local Imports */
import { MessengerEntity } from './entities/messenger.entity';

@QueryService(MessengerEntity)
export class MessengersService extends TypeOrmQueryService<MessengerEntity> {
  constructor(
    @InjectRepository(MessengerEntity) repo: Repository<MessengerEntity>,
  ) {
    super(repo);
  }
}
