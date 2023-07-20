import { Field, InputType } from '@nestjs/graphql';
@InputType('InputCreatePackageStatus')
export class InputCreatePackageStatusDTO {
  @Field()
  status!: string;

  @Field()
  description!: string;
}
