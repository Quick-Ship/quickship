import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';

import { ContactService } from './contact.service';
import { ContactDTO } from './dto/contact.dto';

@Resolver(() => ContactDTO)
export class ContactResolver extends CRUDResolver(ContactDTO) {
  constructor(readonly contactService: ContactService) {
    super(contactService);
  }
}
