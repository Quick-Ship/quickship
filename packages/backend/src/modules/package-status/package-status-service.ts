import { InjectRepository } from '@nestjs/typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Repository } from 'typeorm';

/*Local Imports */
import { PackageStatusEntity } from './entities/package-status.entity';

@QueryService(PackageStatusEntity)
export class PackageStatusService extends TypeOrmQueryService<PackageStatusEntity> {
  constructor(
    @InjectRepository(PackageStatusEntity)
    repo: Repository<PackageStatusEntity>,
  ) {
    super(repo);
  }
}
