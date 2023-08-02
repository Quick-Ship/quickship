import { Module, UseGuards } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

/*Local Imports */
import { PackageStatusResolver } from './package-status-resolver';
import { PackageStatusService } from './package-status-service';
import { PackageStatusEntity } from './entities/package-status.entity';
import { PackageStatusDTO } from './dto/package-status-dto';
import { InputCreatePackageStatusDTO } from './dto/create-package-status.dto';
import { InputUpdatePackageStatusDTO } from './dto/update-package-status.dto';
import { GqlAuthGuard } from 'src/common/auth/auth.guard';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([PackageStatusEntity])],
      services: [PackageStatusService],
      resolvers: [
        {
          delete: { disabled: true },
          DTOClass: PackageStatusDTO,
          EntityClass: PackageStatusEntity,
          ServiceClass: PackageStatusService,
          CreateDTOClass: InputCreatePackageStatusDTO,
          UpdateDTOClass: InputUpdatePackageStatusDTO,
          read: {
            decorators: [UseGuards(GqlAuthGuard)],
          },
          update: { decorators: [UseGuards(GqlAuthGuard)] },
          create: { decorators: [UseGuards(GqlAuthGuard)] },
        },
      ],
    }),
  ],
  providers: [PackageStatusResolver, PackageStatusService],
  exports: [PackageStatusService],
})
export class PackageStatusModule {}
