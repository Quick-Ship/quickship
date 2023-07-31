import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ValidationPipe } from '@nestjs/common';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { UserDTO } from './dtos/user.dto';
import { UserService } from './users.service';
import { RegisterUserDTO } from './dtos/register-user-dto';
import { RegisterUserResponseDTO } from './dtos/register-user.response.dto';

/*Local Imports */

@Resolver(() => UserDTO)
export class UserResolver extends CRUDResolver(UserDTO, {
  create: {
    one: { disabled: true },
    many: { disabled: true },
  },
}) {
  constructor(readonly userService: UserService) {
    super(userService);
  }

  @Mutation(() => RegisterUserResponseDTO)
  public async registerUser(
    @Args('input', new ValidationPipe())
    input: RegisterUserDTO,
  ): Promise<RegisterUserResponseDTO> {
    return this.userService.registerUser(input);
  }
}
