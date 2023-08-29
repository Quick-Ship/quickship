import { ShipmentCourierEntity } from './entities/shipment-courier.entity';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryService(ShipmentCourierEntity)
export class ShipmentCourierService extends TypeOrmQueryService<ShipmentCourierEntity> {
  constructor(
    @InjectRepository(ShipmentCourierEntity)
    repo: Repository<ShipmentCourierEntity>,
  ) {
    super(repo);
  }
}
