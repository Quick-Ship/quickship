import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { UserDTO } from './dtos/user.dto';
import { UserService } from './users.service';
import { RegisterUserDTO } from './dtos/register-user-dto';
import { RegisterUserResponseDTO } from './dtos/register-user.response.dto';
import { IPayloadUser } from 'src/common/auth/interfaces/auth.interface';
import { CurrentUser } from 'src/common/auth/current-user.decorator';
import { ViewerDTO } from './dtos/viewer.dto';
import { GqlAuthGuard } from 'src/common/auth/auth.guard';

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

  @Query(() => ViewerDTO)
  @UseGuards(GqlAuthGuard)
  async viewerUser(@CurrentUser() user: IPayloadUser): Promise<ViewerDTO> {
    return await this.userService.viewer(user);
  }
}
