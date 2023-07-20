import { Field, InputType } from '@nestjs/graphql';

@InputType('InputUpdatePackageStatusDTO')
export class InputUpdatePackageStatusDTO {
  @Field()
  status!: string;

  @Field()
  description!: string;
}
