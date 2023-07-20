import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Resolver } from '@nestjs/graphql';
import { PackageStatusService } from './package-status-service';
import { PackageStatusDTO } from './dto/package-status-dto';

@Resolver(() => PackageStatusDTO)
export class PackageStatusResolver extends CRUDResolver(PackageStatusDTO) {
  constructor(readonly repo: PackageStatusService) {
    super(repo);
  }
}
