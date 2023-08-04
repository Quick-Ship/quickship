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
import { CurrentUser } from 'src/common/auth/current-user.decorator';
import { InputCreatePackagesDTO } from './dto/create-packages.dto';
import { IPayloadUser } from 'src/common/auth/interfaces/auth.interface';

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
    @CurrentUser() user: IPayloadUser,
  ): Promise<PackageDTO> {
    return this.packagesService.createPackage(input, user);
  }

  @Mutation(() => ChangePackageStatusResponseDTO)
  @UseGuards(GqlAuthGuard)
  public async changePackageStatus(
    @Args('input', new ValidationPipe())
    input: InputChangePackageStatusDTO,
  ): Promise<ChangePackageStatusResponseDTO> {
    return this.packagesService.changePackageStatus(input);
  }

  @Mutation(() => [PackageDTO])
  @UseGuards(GqlAuthGuard)
  public async createDeliveries(
    @Args('input', new ValidationPipe())
    input: InputCreatePackagesDTO,
    @CurrentUser() user: IPayloadUser,
  ): Promise<PackageDTO[]> {
    return this.packagesService.createPackages(input, user);
  }
}
