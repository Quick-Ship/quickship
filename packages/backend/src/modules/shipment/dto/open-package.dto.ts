import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsNumber } from 'class-validator';

@InputType('InputOpenPackage')
export class InputOpenPackageDTO {
  @Field()
  @IsDefined()
  @IsNumber()
  shipmentId: number;

  @Field()
  @IsDefined()
  @IsNumber()
  packageId: number;
}
