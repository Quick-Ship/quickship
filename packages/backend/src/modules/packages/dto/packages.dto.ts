import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import {
  FilterableCursorConnection,
  FilterableField,
  FilterableRelation,
  KeySet,
  PagingStrategies,
  QueryOptions,
} from '@nestjs-query/query-graphql';
import { ContactDTO } from 'src/modules/contact/dto/contact.dto';
import { DirectionDTO } from 'src/modules/directions/dto/directions.dto';
import { ShipmentDTO } from 'src/modules/shipment/dto/shipment.dto';
import { SortDirection } from '@nestjs-query/core';
import { ClientDTO } from 'src/modules/client/dto/client.dto';
import { PackageStatusDTO } from 'src/modules/package-status/dto/package-status-dto';
import { EvidenceDTO } from 'src/modules/evidences/dto/evidence.dto';

@ObjectType('Package')
@KeySet(['id'])
@QueryOptions({
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
  maxResultsSize: 1000,
})
@FilterableRelation('shipment', () => ShipmentDTO, {
  nullable: true,
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
@FilterableRelation('direction', () => DirectionDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
@FilterableRelation('contact', () => ContactDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
@FilterableRelation('client', () => ClientDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
@FilterableRelation('status', () => PackageStatusDTO, {
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
@FilterableCursorConnection('evidences', () => EvidenceDTO, {
  nullable: true,
  defaultResultSize: 200,
  maxResultsSize: 500,
  defaultSort: [{ field: 'createdAt', direction: SortDirection.ASC }],
  pagingStrategy: PagingStrategies.OFFSET,
})
export class PackageDTO {
  @Field()
  id!: number;

  @FilterableField()
  guide!: string;

  @Field()
  weigth!: number;

  @Field()
  width!: number;

  @Field()
  heigth!: number;

  @Field()
  length!: number;

  @FilterableField()
  clientId: number;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}
