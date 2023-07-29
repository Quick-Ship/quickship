import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ValidationPipe } from '@nestjs/common';

/*Local Imports */
import { MessengerDTO } from './dto/messenger.dto';
import { MessengersService } from './messengers.service';
import { RegisterClientResponseDTO } from '../client/dto/register-client-dto';
import { InputRegisterCourierDTO } from './dto/register-messenger.dto';
import { ResponseRegisterCourierDTO } from './dto/register-courier-response.dto';

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
}
