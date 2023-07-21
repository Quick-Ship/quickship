import { InjectRepository } from '@nestjs/typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Repository } from 'typeorm';

/*Local Imports */
import { EvidenceEntity } from './entities/evidence.entity';

@QueryService(EvidenceEntity)
export class EvidenceService extends TypeOrmQueryService<EvidenceEntity> {
  constructor(
    @InjectRepository(EvidenceEntity) repo: Repository<EvidenceEntity>,
  ) {
    super(repo);
  }
}
