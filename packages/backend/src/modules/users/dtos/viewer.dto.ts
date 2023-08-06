import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Viewer')
export class ViewerDTO {
  @Field(() => String)
  email!: string;

  @Field(() => Number)
  userId!: number;

  @Field(() => String)
  tenant!: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;
}
