import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

/*Local Imports */
import { PackagesService } from './packages.service';
import { PackagesResolver } from './packages.resolver';
import { PackageEntity } from './entities/package.entity';
import { PackageDTO } from './dto/packages.dto';
import { InputCreatePackageDTO } from './dto/create-package.input';
import { InputUpdatePackageDTO } from './dto/update-package.input';
import { ContactModule } from '../contact/contact.module';
import { DirectionModule } from '../directions/directions.module';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([PackageEntity]), //ContactModule, DirectionModule
      ],
      services: [PackagesService],
      resolvers: [
        {
          delete: { disabled: true },
          DTOClass: PackageDTO,
          EntityClass: PackageEntity,
          ServiceClass: PackagesService,
          CreateDTOClass: InputCreatePackageDTO,
          UpdateDTOClass: InputUpdatePackageDTO,
        },
      ],
    }),
  ],
  providers: [PackagesResolver, PackagesService],
  exports: [PackagesService],
})
export class PackagesModule {}
