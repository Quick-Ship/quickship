import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { ClientDTO } from './dto/client.dto';
import { ValidationPipe } from '@nestjs/common';
import { InputCreateClientDTO } from './dto/create-client.input';
import { CRUDResolver } from '@nestjs-query/query-graphql';
import { RegisterClientResponseDTO } from './dto/register-client-dto';

@Resolver(() => ClientDTO)
export class ClientResolver extends CRUDResolver(ClientDTO) {
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
