import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType('InputUpdateEvidence')
export class InputUpdateEvidenceDTO {
  @Field({ nullable: true })
  @IsString()
  personReceived?: string;

  @Field({ nullable: true })
  @IsString()
  comments?: string;

  @Field({ nullable: true })
  @IsString()
  url?: string;
}
