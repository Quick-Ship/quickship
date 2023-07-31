import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('RegisterUserResponse')
export class RegisterUserResponseDTO {
  @Field()
  url: string;
}
