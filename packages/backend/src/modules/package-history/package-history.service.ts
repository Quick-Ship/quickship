import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackageHistoryEntity } from './entities/package-history.entity';

@QueryService(PackageHistoryEntity)
export class PackagesHistoryService extends TypeOrmQueryService<PackageHistoryEntity> {
  constructor(
    @InjectRepository(PackageHistoryEntity)
    repo: Repository<PackageHistoryEntity>,
  ) {
    super(repo);
  }
}
