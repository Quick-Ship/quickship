import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType('InputEvidence')
export class InputEvidence {
  @Field()
  @IsString()
  personReceived: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  comments?: string;

  @Field()
  @IsString()
  url: string;
}

@InputType('InputClosePackage')
export class InputClosePackageDTO {
  @Field()
  @IsDefined()
  @IsNumber()
  shipmentId: number;

  @Field()
  @IsDefined()
  @IsNumber()
  packageId: number;

  @Field(() => InputEvidence)
  @IsDefined()
  evidence: InputEvidence;
}
