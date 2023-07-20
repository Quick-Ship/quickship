import { IsNumber, IsOptional, IsString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { InputCreatePackageDTO } from 'src/modules/packages/dto/create-package.input';

@InputType('InputUpdateShipment')
export class InputUpdateShipmentDTO {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  comments?: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  messengerId?: number;

  @Field(() => [InputCreatePackageDTO], { nullable: true })
  packages?: InputCreatePackageDTO[];
}
