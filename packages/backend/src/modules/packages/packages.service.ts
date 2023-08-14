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
import {
  ChangePackageStatusResponseDTO,
  ChangeStatusReponse,
} from './dto/change-package-status-response.dto';
import { EvidenceEntity } from '../evidences/entities/evidence.entity';
import { PackageStatusDescriptionEnum } from 'src/common/enums/package-status-description.enum';
import { PackageStatusEnum } from 'src/common/enums/package-status.enum';
import { ShipmentEntity } from '../shipment/entities/shipment.entity';
import { ShipmentStatusEnum } from 'src/common/enums/shipment-status-enum';
import {
  PackageStatusCancelTypes,
} from 'src/common/enums/package-status-cancelatio.enum';
import { InputCreatePackagesDTO } from './dto/create-packages.dto';
import { IPayloadUser } from 'src/common/auth/interfaces/auth.interface';

@QueryService(PackageEntity)
export class PackagesService extends TypeOrmQueryService<PackageEntity> {
  constructor(
    @InjectRepository(PackageEntity) repo: Repository<PackageEntity>,
    @InjectPinoLogger(PackagesService.name)
    private readonly logger: PinoLogger,
  ) {
    super(repo);
  }

  public async createPackage(input: InputCreatePackageDTO, user: IPayloadUser) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.logger.debug({
        event: 'packageService.createPackages.input',
        data: { input, user },
      });
      const contact = await queryRunner.manager.save(ContactEntity, {
        ...input.contact,
      });
      const direction = await queryRunner.manager.save(DirectionEntity, {
        ...input.direction,
      });
      const packages = await queryRunner.manager.save(PackageEntity, {
        clientId: user.tenant === 'USER' ? input.idClient : user.id,
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

      const packages = await queryRunner.manager.query(
        `select id, guide, shipment_id as shipmentId, status_id as statusId from packages where guide in (${input.update.map(
          (p) => `'${p.guide}')`,
        )} and status_id != ${PackageStatusEnum.DE}`,
      );

      const response: ChangeStatusReponse[] = await Promise.all(
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

          const packagePending = await queryRunner.manager.find(PackageEntity, {
            where: { shipmentId: pack.shipmentid },
          });

          const { arrivalFacility, cancel, delivered, totalPackShipment } =
            packagePending.reduce(
              (value, acc) => {
                if (PackageStatusCancelTypes.includes(acc.statusId)) {
                  value.cancel += 1;
                }
                if (acc.statusId === PackageStatusEnum.DE) {
                  value.delivered += 1;
                }
                if (acc.statusId === PackageStatusEnum.AR) {
                  value.arrivalFacility += 1;
                }

                value.totalPackShipment += 1;

                return value;
              },
              {
                cancel: 0,
                delivered: 0,
                arrivalFacility: 0,
                totalPackShipment: 0,
              },
            );

          this.logger.debug({
            event: 'packageService.changePackageStatus.compare.closeShipment',
            data: {
              arrivalFacility,
              cancel,
              delivered,
              totalPackShipment,
            },
          });

          if (cancel === 0) {
            //entra a validar el cierre del shipment
            const totalIncomplete = totalPackShipment - arrivalFacility;
            if (totalIncomplete !== totalPackShipment) {
              await queryRunner.manager.update(
                ShipmentEntity,
                pack.shipmentid,
                {
                  shipmentStatusId: ShipmentStatusEnum.IN_COMPLETE,
                },
              );
            }
            if (delivered === totalPackShipment) {
              await queryRunner.manager.update(
                ShipmentEntity,
                pack.shipmentid,
                {
                  shipmentStatusId: ShipmentStatusEnum.COMPLETED,
                },
              );
            }
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
      console.log(error);
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

  public async createPackages(
    input: InputCreatePackagesDTO,
    user: IPayloadUser,
  ) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.logger.debug({
        event: 'packageService.createPackages.input',
        data: { input, user },
      });
      const response = await Promise.all(
        input.packages.map(async (many) => {
          const contact = await queryRunner.manager.save(ContactEntity, {
            ...many.contact,
          });
          const direction = await queryRunner.manager.save(DirectionEntity, {
            ...many.direction,
          });
          const packages = await queryRunner.manager.save(PackageEntity, {
            clientId: user.tenant === 'USER' ? many.idClient : user.id,
            contactId: contact.id,
            directionId: direction.id,
            statusId: PackageStatusEnum.SC,
            guide: many.guide,
            heigth: many.heigth,
            length: many.length,
            weigth: many.weigth,
            width: many.width,
          });
          await queryRunner.manager.save(PackageHistoryEntity, {
            status: 'SC',
            idPackage: packages.id,
            description: PackageStatusDescriptionEnum.SC,
          });

          return packages;
        }),
      );

      await queryRunner.commitTransaction();

      this.logger.debug({
        event: 'packageService.createPackages.response',
        data: response,
      });

      return response;
    } catch (error) {
      if (queryRunner.isTransactionActive)
        await queryRunner.rollbackTransaction();
      throw new GraphQLError(error?.message || error);
    } finally {
      await queryRunner.release();
    }
  }
}
