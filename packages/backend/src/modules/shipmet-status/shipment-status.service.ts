import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/*Local Imports */
import { ShipmentStatusEntity } from './entities/shipment-status.entity';

@QueryService(ShipmentStatusEntity)
export class ShipmentStatusService extends TypeOrmQueryService<ShipmentStatusEntity> {
  constructor(
    @InjectRepository(ShipmentStatusEntity)
    repo: Repository<ShipmentStatusEntity>,
  ) {
    super(repo);
  }
}
