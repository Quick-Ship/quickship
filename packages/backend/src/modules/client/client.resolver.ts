import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { ClientDTO } from './dto/client.dto';

@Resolver(() => ClientDTO)
export class ClientResolver extends CRUDResolver(ClientDTO) {
  constructor(readonly repo: ClientService) {
    super(repo);
  }
}
