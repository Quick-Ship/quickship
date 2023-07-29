import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ValidationPipe } from '@nestjs/common';
import { CRUDResolver } from '@nestjs-query/query-graphql';

/*Local Imports */
import { RegisterClientResponseDTO } from './dto/register-client-dto';
import { InputCreateClientDTO } from './dto/create-client.input';
import { ClientService } from './client.service';
import { ClientDTO } from './dto/client.dto';

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
}
