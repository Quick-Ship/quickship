import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { CRUDResolver } from '@nestjs-query/query-graphql';

/*Local Imports */
import { RegisterClientResponseDTO } from './dto/register-client-dto';
import { InputCreateClientDTO } from './dto/create-client.input';
import { ClientService } from './client.service';
import { ClientDTO } from './dto/client.dto';
import { ViewerDTO } from '../users/dtos/viewer.dto';
import { GqlAuthGuard } from 'src/common/auth/auth.guard';
import { CurrentUser } from 'src/common/auth/current-user.decorator';
import { IPayloadUser } from 'src/common/auth/interfaces/auth.interface';

@Resolver(() => ClientDTO)
export class ClientResolver extends CRUDResolver(ClientDTO, {
  create: {
    one: { disabled: true },
    many: { disabled: true },
  },
}) {
  constructor(readonly clientService: ClientService) {
    super(clientService);
  }

  @Mutation(() => RegisterClientResponseDTO)
  public async registerClient(
    @Args('input', new ValidationPipe())
    input: InputCreateClientDTO,
  ): Promise<RegisterClientResponseDTO> {
    return this.clientService.registerClient(input);
  }

  @Query(() => ViewerDTO)
  @UseGuards(GqlAuthGuard)
  async viewerClient(@CurrentUser() user: IPayloadUser): Promise<ViewerDTO> {
    return await this.clientService.viewer(user);
  }
}
