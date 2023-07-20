import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Repository } from 'typeorm';

/*Local Imports */
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceEntity } from './entities/invoice.entity';

@QueryService(InvoiceEntity)
export class InvoicesService extends TypeOrmQueryService<InvoiceEntity> {
  constructor(
    @InjectRepository(InvoiceEntity) repo: Repository<InvoiceEntity>,
  ) {
    super(repo);
  }
}
