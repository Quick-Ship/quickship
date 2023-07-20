import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';

/*Local Imports */
import { InvoicesService } from './invoices.service';
import { InvoiceDTO } from './dto/invoice.dto';

@Resolver(() => InvoiceDTO)
export class InvoicesResolver extends CRUDResolver(InvoiceDTO) {
  constructor(readonly invoicesService: InvoicesService) {
    super(invoicesService);
  }
}
