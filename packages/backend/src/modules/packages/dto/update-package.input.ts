import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType('InputUpdatePackage')
export class InputUpdatePackageDTO {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  weigth?: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  width?: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  heigth?: number;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  legth?: number;
}
