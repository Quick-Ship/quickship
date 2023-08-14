import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@ObjectType('ChangeStatusReponse')
export class ChangeStatusReponse {
  @Field()
  @IsString()
  @IsNotEmpty()
  guide: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  statusId: number;
}

@ObjectType('ChangePackageStatusResponseDTO')
export class ChangePackageStatusResponseDTO {
  @Field(() => [ChangeStatusReponse]!)
  data: ChangeStatusReponse[];
}
