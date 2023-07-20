import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { PackageEntity } from './entities/package.entity';
import { InputCreatePackageDTO } from './dto/create-package.input';
import { GraphQLError } from 'graphql';
import { ContactEntity } from '../contact/entities/contact.entity';
import { DirectionEntity } from '../directions/entities/direction.entity';
import { PackageHistoryEntity } from '../package-history/entities/package-history.entity';
import { PackageStatusEnum } from 'src/common/package-status.enum';
import { PackageStatusDescriptionEnum } from 'src/common/package-status-description.enum';

@QueryService(PackageEntity)
export class PackagesService extends TypeOrmQueryService<PackageEntity> {
  constructor(
    @InjectRepository(PackageEntity) repo: Repository<PackageEntity>,
  ) {
    super(repo);
  }

  public async createPackages(input: InputCreatePackageDTO) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const contact = await queryRunner.manager.save(ContactEntity, {
        ...input.contact,
      });
      const direction = await queryRunner.manager.save(DirectionEntity, {
        ...input.direction,
      });
      const packages = await queryRunner.manager.save(PackageEntity, {
        clientId: input.idClient,
        contactId: contact.id,
        directionId: direction.id,
        statusId: PackageStatusEnum.SC,
        guide: input.guide,
        heigth: input.heigth,
        length: input.length,
        weigth: input.weigth,
        width: input.width,
      });
      await queryRunner.manager.save(PackageHistoryEntity, {
        status: 'SC',
        idPackage: packages.id,
        description: PackageStatusDescriptionEnum.SC,
      });

      await queryRunner.commitTransaction();

      return packages;
    } catch (error) {
      if (queryRunner.isTransactionActive)
        await queryRunner.rollbackTransaction();
      throw new GraphQLError(error?.message || error);
    } finally {
      await queryRunner.release();
    }
  }
}
