import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  FilterableRelation,
  KeySet,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { ContactDTO } from 'src/modules/contact/dto/contact.dto';
import { DirectionDTO } from 'src/modules/directions/dto/directions.dto';
import { ShipmentDTO } from 'src/modules/shipment/dto/shipment.dto';
import { SortDirection } from '@nestjs-query/core';

@ObjectType('package')
@KeySet(['id'])
@FilterableRelation('shipment', () => ShipmentDTO, {
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
  legth!: number;

  @FilterableField(() => GraphQLISODateTime)
  createdAt!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt!: Date;

  @FilterableField(() => GraphQLISODateTime, { nullable: true })
  deletedAt?: Date;
}
