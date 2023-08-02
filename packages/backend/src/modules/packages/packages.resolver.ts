import { CRUDResolver } from '@nestjs-query/query-graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

/*Local Imports */
import { PackagesService } from './packages.service';
import { PackageDTO } from './dto/packages.dto';
import { InputCreatePackageDTO } from './dto/create-package.input';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { InputChangePackageStatusDTO } from './dto/change-package-status.dto';
import { ChangePackageStatusResponseDTO } from './dto/change-package-status-response.dto';
import { GqlAuthGuard } from 'src/common/auth/auth.guard';

@Resolver(() => PackageDTO)
export class PackagesResolver extends CRUDResolver(PackageDTO) {
  constructor(readonly packagesService: PackagesService) {
    super(packagesService);
  }

  @Mutation(() => PackageDTO)
  @UseGuards(GqlAuthGuard)
  public async createDelivery(
    @Args('input', new ValidationPipe())
    input: InputCreatePackageDTO,
  ): Promise<PackageDTO> {
    return this.packagesService.createPackages(input);
  }

  @Mutation(() => ChangePackageStatusResponseDTO)
  @UseGuards(GqlAuthGuard)
  public async changePackageStatus(
    @Args('input', new ValidationPipe())
    input: InputChangePackageStatusDTO,
  ): Promise<ChangePackageStatusResponseDTO> {
    return this.packagesService.changePackageStatus(input);
  }
}
