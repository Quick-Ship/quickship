import { InjectRepository } from '@nestjs/typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Repository } from 'typeorm';

/*Local Imports */
import { ClientEntity } from './entities/client.entity';

@QueryService(ClientEntity)
export class ClientService extends TypeOrmQueryService<ClientEntity> {
  constructor(@InjectRepository(ClientEntity) repo: Repository<ClientEntity>) {
    super(repo);
  }
}
