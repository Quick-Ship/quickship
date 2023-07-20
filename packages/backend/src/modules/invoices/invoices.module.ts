import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

/*Local Import */
import { InvoicesService } from './invoices.service';
import { InvoicesResolver } from './invoices.resolver';
import { InvoiceEntity } from './entities/invoice.entity';
import { InputCreateInvoiceDTO } from './dto/create-invoice.input';
import { InputUpdateInvoiceDTO } from './dto/update-invoice.input';
import { InvoiceDTO } from './dto/invoice.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([InvoiceEntity])],
      services: [InvoicesService],
      resolvers: [
        {
          delete: { disabled: true },
          DTOClass: InvoiceDTO,
          EntityClass: InvoiceEntity,
          ServiceClass: InvoicesService,
          CreateDTOClass: InputCreateInvoiceDTO,
          UpdateDTOClass: InputUpdateInvoiceDTO,
        },
      ],
    }),
  ],
  providers: [InvoicesResolver, InvoicesService],
  exports: [InvoicesService],
})
export class InvoicesModule {}
