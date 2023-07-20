import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';

/*Local Imports */
import { MessengerDTO } from './dto/messenger.dto';
import { MessengersService } from './messengers.service';

@Resolver(() => MessengerDTO)
export class MessengersResolver extends CRUDResolver(MessengerDTO) {
  constructor(readonly repo: MessengersService) {
    super(repo);
  }
}
