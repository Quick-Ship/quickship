import { Field, InputType } from '@nestjs/graphql';

@InputType('InputCreatePackageHistory')
export class InputCreatePackageHistoryDTO {
  @Field({ nullable: false })
  status: string;

  @Field({ nullable: false })
  idPackage: number;

  @Field({ nullable: false })
  description: string;
}
