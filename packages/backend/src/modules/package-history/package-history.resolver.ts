import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';

/*Local Imports*/
import { PackageHistoryDTO } from './dtos/package-history.dto';
import { PackagesHistoryService } from './package-history.service';

@Resolver(() => PackageHistoryDTO)
export class PackageHistoryResolver extends CRUDResolver(PackageHistoryDTO) {
  constructor(readonly packagesHistoryService: PackagesHistoryService) {
    super(packagesHistoryService);
  }
}
