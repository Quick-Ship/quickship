import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards, ValidationPipe } from '@nestjs/common';

/*Local Imports */
import { MessengerDTO } from './dto/messenger.dto';
import { MessengersService } from './messengers.service';
import { RegisterClientResponseDTO } from '../client/dto/register-client-dto';
import { InputRegisterCourierDTO } from './dto/register-messenger.dto';
import { ResponseRegisterCourierDTO } from './dto/register-courier-response.dto';
import { ViewerDTO } from '../users/dtos/viewer.dto';
import { CurrentUser } from 'src/common/auth/current-user.decorator';
import { IPayloadUser } from 'src/common/auth/interfaces/auth.interface';
import { GqlAuthGuard } from 'src/common/auth/auth.guard';

@Resolver(() => MessengerDTO)
export class MessengersResolver extends CRUDResolver(MessengerDTO, {
  create: {
    one: { disabled: true },
    many: { disabled: true },
  },
}) {
  constructor(readonly messengerService: MessengersService) {
    super(messengerService);
  }

  @Mutation(() => RegisterClientResponseDTO)
  public async registerCourier(
    @Args('input', new ValidationPipe())
    input: InputRegisterCourierDTO,
  ): Promise<ResponseRegisterCourierDTO> {
    return this.messengerService.registerCourier(input);
  }

  @Query(() => ViewerDTO)
  @UseGuards(GqlAuthGuard)
  async viewerCourier(@CurrentUser() user: IPayloadUser): Promise<ViewerDTO> {
    return await this.messengerService.viewer(user);
  }
}
