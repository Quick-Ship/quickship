import { Field, InputType } from '@nestjs/graphql';

@InputType('InputUpdatePackageHistory')
export class InputUpdatePackageHistoryDTO {
  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  idPackage?: number;

  @Field({ nullable: true })
  description?: string;
}
