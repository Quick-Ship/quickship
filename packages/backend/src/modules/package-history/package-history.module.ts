import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

/*Local Imports */
import { PackageHistoryEntity } from './entities/package-history.entity';
import { PackageHistoryResolver } from './package-history.resolver';
import { PackagesHistoryService } from './package-history.service';
import { PackageHistoryDTO } from './dtos/package-history.dto';
import { InputCreatePackageHistoryDTO } from './dtos/create-package-history.dto';
import { InputUpdatePackageHistoryDTO } from './dtos/upate-package-history.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([PackageHistoryEntity])],
      services: [PackagesHistoryService],
      resolvers: [
        {
          delete: { disabled: true },
          DTOClass: PackageHistoryDTO,
          EntityClass: PackageHistoryEntity,
          ServiceClass: PackagesHistoryService,
          CreateDTOClass: InputCreatePackageHistoryDTO,
          UpdateDTOClass: InputUpdatePackageHistoryDTO,
        },
      ],
    }),
  ],
  providers: [PackageHistoryResolver, PackagesHistoryService],
  exports: [PackagesHistoryService],
})
export class PackageHistoryModule {}
