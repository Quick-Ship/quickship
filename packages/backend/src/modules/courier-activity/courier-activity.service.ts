import { Injectable } from '@nestjs/common';
import { CourierActivityEntity } from './entities/courier-activity.entity';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryService(CourierActivityEntity)
export class CourierActivityService extends TypeOrmQueryService<CourierActivityEntity> {
  constructor(
    @InjectRepository(CourierActivityEntity)
    repo: Repository<CourierActivityEntity>,
  ) {
    super(repo);
  }
}
