import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

/*Local Imports */
import { PackagesService } from './packages.service';
import { PackageDTO } from './dto/packages.dto';
import { InputCreatePackageDTO } from './dto/create-package.input';
import { ValidationPipe } from '@nestjs/common';
import { InputChangePackageStatusDTO } from './dto/change-package-status.dto';
import { ChangePackageStatusResponseDTO } from './dto/change-package-status-response.dto';

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

  @Mutation(() => ChangePackageStatusResponseDTO)
  public async changePackageStatus(
    @Args('input', new ValidationPipe())
    input: InputChangePackageStatusDTO,
  ): Promise<ChangePackageStatusResponseDTO> {
    return this.packagesService.changePackageStatus(input);
  }
}
