import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType('InputCreateEvidence')
export class InputCreateEvidenceDTO {
  @Field()
  @IsString()
  personReceived: string;

  @Field({ nullable: true })
  @IsString()
  comments?: string;

  @Field()
  @IsString()
  url: string;
}
