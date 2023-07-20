import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/*Local Imports*/
import { DirectionEntity } from './entities/direction.entity';

@QueryService(DirectionEntity)
export class DirectionsService extends TypeOrmQueryService<DirectionEntity> {
  constructor(
    @InjectRepository(DirectionEntity) repo: Repository<DirectionEntity>,
  ) {
    super(repo);
  }
}
