import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

/*Local Imports */
import { PackagesService } from './packages.service';
import { PackageDTO } from './dto/packages.dto';
import { InputCreatePackageDTO } from './dto/create-package.input';
import { ValidationPipe } from '@nestjs/common';

@Resolver(() => PackageDTO)
export class PackagesResolver extends CRUDResolver(PackageDTO) {
  constructor(readonly packagesService: PackagesService) {
    super(packagesService);
  }

  @Mutation(() => PackageDTO)
  public async createDelivery(
    @Args('input', new ValidationPipe())
    input: InputCreatePackageDTO,
  ): Promise<PackageDTO> {
    return this.packagesService.createPackages(input);
  }
}
