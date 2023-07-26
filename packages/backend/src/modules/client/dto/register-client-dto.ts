import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('RegisterClientResponse')
export class RegisterClientResponseDTO {
  @Field()
  url: string;
}
