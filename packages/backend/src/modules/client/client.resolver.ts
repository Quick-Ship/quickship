import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { ClientDTO } from './dto/client.dto';
import { ValidationPipe } from '@nestjs/common';
import { InputCreateClientDTO } from './dto/create-client.input';

@Resolver(() => ClientDTO)
export class ClientResolver extends CRUDResolver(ClientDTO) {
  constructor(readonly repo: ClientService) {
    super(repo);
  }

  @Mutation(() => ClientDTO)
  public async registerClient(
    @Args('input', new ValidationPipe())
    input: InputCreateClientDTO,
  ): Promise<ClientDTO> {
    return this.repo.registerClient(input);
  }
}
