import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { GraphQLError } from 'graphql';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

/*Local Imports */
import { PackageEntity } from './entities/package.entity';
import { InputCreatePackageDTO } from './dto/create-package.input';
import { ContactEntity } from '../contact/entities/contact.entity';
import { DirectionEntity } from '../directions/entities/direction.entity';
import { PackageHistoryEntity } from '../package-history/entities/package-history.entity';

import { InputChangePackageStatusDTO } from './dto/change-package-status.dto';
import {
  getStatusByIdStatus,
  getStatusDescriptionByIdStatus,
  validateEvidenceByPackageStatus,
} from 'src/common/utils';
import { ChangePackageStatusResponseDTO } from './dto/change-package-status-response.dto';
import { EvidenceEntity } from '../evidences/entities/evidence.entity';
import { PackageStatusDescriptionEnum } from 'src/common/enums/package-status-description.enum';
import { PackageStatusEnum } from 'src/common/enums/package-status.enum';

@QueryService(PackageEntity)
export class PackagesService extends TypeOrmQueryService<PackageEntity> {
  constructor(
    @InjectRepository(PackageEntity) repo: Repository<PackageEntity>,
    @InjectPinoLogger(PackagesService.name)
    private readonly logger: PinoLogger,
  ) {
    super(repo);
  }

  public async createPackages(input: InputCreatePackageDTO) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.logger.debug({
        event: 'packageService.createPackages.input',
        data: input,
      });
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

      this.logger.debug({
        event: 'packageService.createPackages.response',
        data: packages,
      });

      return packages;
    } catch (error) {
      if (queryRunner.isTransactionActive)
        await queryRunner.rollbackTransaction();
      throw new GraphQLError(error?.message || error);
    } finally {
      await queryRunner.release();
    }
  }
  public async changePackageStatus(
    input: InputChangePackageStatusDTO,
  ): Promise<ChangePackageStatusResponseDTO> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.logger.error({
        event: 'packageService.changePackageStatus.input',
        data: input,
      });

      const packages: PackageEntity[] = await queryRunner.manager.query(
        `select id, guide from packages where guide in (${input.update.map(
          (g) => `'${g.guide}'`,
        )})`,
      );

      const response = await Promise.all(
        packages.map(async (pack) => {
          const packFind = input.update.find((p) => p.guide === pack.guide);

          validateEvidenceByPackageStatus(packFind.statusId, packFind);

          await queryRunner.manager.update(PackageEntity, pack.id, {
            statusId: packFind.statusId,
          });
          await queryRunner.manager.save(PackageHistoryEntity, {
            status: getStatusByIdStatus(packFind.statusId),
            idPackage: pack.id,
            description: getStatusDescriptionByIdStatus(packFind.statusId),
          });
          if (packFind?.evidence) {
            await queryRunner.manager.save(EvidenceEntity, {
              ...packFind?.evidence,
              packageId: pack.id,
            });
          }
          return {
            guide: pack.guide,
            statusId: packFind.statusId,
          };
        }),
      );

      this.logger.debug({
        event: 'packageService.response',
        data: response,
      });

      await queryRunner.commitTransaction();

      return { data: response };
    } catch (error) {
      this.logger.error({
        event: 'packageService.changePackageStatus.error',
        error: error,
      });
      if (queryRunner.isTransactionActive)
        await queryRunner.rollbackTransaction();
      throw new GraphQLError(error?.message || error);
    } finally {
      await queryRunner.release();
    }
  }
}
