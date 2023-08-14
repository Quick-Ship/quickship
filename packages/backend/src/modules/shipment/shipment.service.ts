import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { GraphQLError } from 'graphql';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

/*Local Imports */
import { ShipmentEntity } from './entities/shipment.entity';
import { InputGenerateShipmentDTO } from './dto/generate-shipment.dto';
import { PackageEntity } from '../packages/entities/package.entity';
import { PackageHistoryEntity } from '../package-history/entities/package-history.entity';
import { InputAddPackageShipmentDTO } from './dto/add-packages-shipment.dto';
import { InputAssignCourierDTO } from './dto/assign-courier.dto';

import { InputOpenPackageDTO } from './dto/open-package.dto';
import {
  getStatusByIdStatus,
  getStatusDescriptionByIdStatus,
  validTransaction,
} from 'src/common/utils';
import { InputClosePackageDTO } from './dto/close-package.dto';
import { EvidenceEntity } from '../evidences/entities/evidence.entity';
import { InputCancelPackageDTO } from './dto/cancel-package.dto';
import { IPayloadUser } from 'src/common/auth/interfaces/auth.interface';
import { PackageStatusEnum } from 'src/common/enums/package-status.enum';
import { PackageStatusDescriptionEnum } from 'src/common/enums/package-status-description.enum';
import { ShipmentStatusEnum } from 'src/common/enums/shipment-status-enum';
import { PackageStatusCancelTypes } from 'src/common/enums/package-status-cancelatio.enum';
import { Errors } from 'src/common/enums/errors.enum';
import { MessengerEntity } from '../messengers/entities/messenger.entity';
import { PackageStatusCloselTypes } from 'src/common/enums/package-status-close.enum';

@QueryService(ShipmentEntity)
export class ShipmentService extends TypeOrmQueryService<ShipmentEntity> {
  constructor(
    @InjectRepository(ShipmentEntity) repo: Repository<ShipmentEntity>,
    @InjectPinoLogger(ShipmentService.name)
    private readonly logger: PinoLogger,
  ) {
    super(repo);
  }

  public async generateShipment(
    input: InputGenerateShipmentDTO,
    user?: IPayloadUser,
  ) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.logger.debug({
        event: 'shipmentService.generateShipment.input',
        data: { input, user },
      });

      const shipment = await queryRunner.manager.save(ShipmentEntity, {
        comments: input.comments,
        price: 0,
        warehouseShipmentId: input.warehouseShipmentId,
        shipmentStatusId: ShipmentStatusEnum.PENDING,
      });

      await queryRunner.commitTransaction();

      this.logger.debug({
        event: 'shipmentService.generateShipment.response',
        data: shipment,
      });

      return shipment;
    } catch (error) {
      await validTransaction(queryRunner);
      throw new GraphQLError(error?.message || error);
    } finally {
      await queryRunner.release();
    }
  }

  public async addPackageShipment(input: InputAddPackageShipmentDTO) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.logger.debug({
        event: 'shipmentService.addPackageShipment.input',
        data: input,
      });
      const [shipment] = await queryRunner.manager.find(ShipmentEntity, {
        where: { id: input.shipmentId },
      });
      this.logger.debug({
        event: 'shipmentService.addPackageShipment.shipmentEntity',
        data: shipment,
      });

      const packages: PackageEntity[] = await queryRunner.manager.query(
        `select * from packages where guide in (${input.guides.map(
          (g) => `'${g}'`,
        )}) and status_id in (${PackageStatusEnum.SC},${PackageStatusEnum.AR})`,
      );

      if (packages.length === 0) {
        throw new GraphQLError(
          Errors.GUIDE_NOT_FOUND_ADD_SHIPMENT.replace(
            '$guides',
            input.guides.toString(),
          ),
        );
      }

      this.logger.debug({
        event: 'shipmentService.addPackageShipment.packageEntity',
        data: packages,
      });

      await Promise.all(
        packages.map(async (pack) => {
          await queryRunner.manager.update(PackageEntity, pack.id, {
            shipmentId: shipment.id,
            statusId: PackageStatusEnum.WC,
          });

          await queryRunner.manager.save(PackageHistoryEntity, {
            status: getStatusByIdStatus(PackageStatusEnum.PU),
            idPackage: pack.id,
            description: PackageStatusDescriptionEnum.PU,
          });

          await queryRunner.manager.save(PackageHistoryEntity, {
            status: getStatusByIdStatus(PackageStatusEnum.WC),
            idPackage: pack.id,
            description: PackageStatusDescriptionEnum.WC,
          });
        }),
      );

      this.logger.debug({
        event: 'shipmentService.addPackageShipment.response',
        data: shipment,
      });

      await queryRunner.commitTransaction();

      return shipment;
    } catch (error) {
      await validTransaction(queryRunner);
      throw new GraphQLError(error?.message || error);
    } finally {
      await queryRunner.release();
    }
  }

  public async assignCourierShipment(input: InputAssignCourierDTO) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.logger.debug({
        event: 'shipmentService.assignCourierShipment.input',
        data: input,
      });
      const [shipment] = await queryRunner.manager.find(ShipmentEntity, {
        where: { id: input.shipmentId },
      });

      this.logger.debug({
        event: 'shipmentService.assignCourierShipment.shipmentEntity',
        data: shipment,
      });

      this.validateShipmentStatus(shipment, ShipmentStatusEnum.PENDING);

      const [messenger] = await queryRunner.manager.find(MessengerEntity, {
        where: {
          id: input.courierId,
          courierActivityId: 1,
        },
      });

      if (!messenger) {
        this.logger.warn({
          event: 'shipmentService.assignCourierShipment.activityCourierInvalid',
          warning: Errors.COURIER_ACTIVITY_INVALID,
        });
        throw new GraphQLError(Errors.COURIER_ACTIVITY_INVALID);
      }

      const [currentShipment] = await queryRunner.manager.find(ShipmentEntity, {
        where: {
          messengerId: input.courierId,
          shipmentStatusId: ShipmentStatusEnum.IN_PROCESS,
        },
      });

      this.logger.debug({
        event: 'shipmentService.assignCourierShipment.currentShipment',
        data: currentShipment,
      });

      if (currentShipment) {
        this.logger.warn({
          event: 'shipmentService.assignCourierShipment.courierInvalid',
          warning: Errors.COURIER_INVALID,
        });
        throw new GraphQLError(Errors.COURIER_INVALID);
      }

      await queryRunner.manager.update(ShipmentEntity, shipment.id, {
        messengerId: input.courierId,
        shipmentStatusId: ShipmentStatusEnum.IN_PROCESS,
      });

      await queryRunner.commitTransaction();

      this.logger.debug({
        event: 'shipmentService.assignCourierShipment.response',
        data: shipment,
      });
      return shipment;
    } catch (error) {
      await validTransaction(queryRunner);
      throw new GraphQLError(error?.message || error);
    } finally {
      await queryRunner.release();
    }
  }

  public async openPackage(input: InputOpenPackageDTO) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.logger.debug({
        event: 'shipmentService.openPackage.input',
        data: input,
      });
      const [shipment] = await queryRunner.manager.find(ShipmentEntity, {
        where: { id: input.shipmentId },
      });

      this.logger.debug({
        event: 'shipmentService.openPackage.shipmentEntity',
        data: shipment,
      });

      this.validateShipmentStatus(shipment, ShipmentStatusEnum.IN_PROCESS);

      if (!shipment.messengerId) {
        this.logger.warn({
          event: 'shipmentService.openPackage.invalidOpenPackage',
          warning: Errors.INVALID_PROCESS_PACKAGE,
        });
        throw new GraphQLError(Errors.SHIPMENT_NOT_COURIER);
      }

      const [packages] = await queryRunner.manager.find(PackageEntity, {
        where: { id: input.packageId },
      });

      this.logger.debug({
        event: 'shipmentService.openPackage.packagesEntity',
        data: packages,
      });

      this.validatePackage(packages, shipment.id);

      if (
        !PackageStatusCancelTypes.includes(packages.statusId) &&
        packages.statusId !== PackageStatusEnum.WC
      ) {
        this.logger.warn({
          event: 'shipmentService.openPackage.invalidProcessPackage',
          warning: Errors.INVALID_PROCESS_PACKAGE,
        });
        throw new GraphQLError(Errors.INVALID_PROCESS_PACKAGE);
      }

      await queryRunner.manager.update(PackageEntity, packages.id, {
        statusId: PackageStatusEnum.PL,
      });

      await queryRunner.manager.save(PackageHistoryEntity, {
        status: getStatusByIdStatus(PackageStatusEnum.PL),
        idPackage: packages.id,
        description: getStatusDescriptionByIdStatus(PackageStatusEnum.PL),
      });

      await queryRunner.commitTransaction();

      this.logger.debug({
        event: 'shipmentService.openPackage.response',
        data: shipment,
      });
      return shipment;
    } catch (error) {
      await validTransaction(queryRunner);
      throw new GraphQLError(error?.message || error);
    } finally {
      await queryRunner.release();
    }
  }

  private validateShipmentStatus(
    shipment: ShipmentEntity,
    status: ShipmentStatusEnum,
  ) {
    if (!shipment) {
      this.logger.warn({
        event: 'shipmentService.validateShipmentStatus.shipmentNotFound',
        warning: Errors.SHIPMENT_NOT_FOUND,
      });
      new GraphQLError(Errors.SHIPMENT_NOT_FOUND);
    }

    if (shipment?.shipmentStatusId !== status) {
      this.logger.warn({
        event: 'shipmentService.validateShipmentStatus.shipmentInvalidStatus',
        warning: Errors.SHIPMENT_STATUS_INVALID,
      });
      new GraphQLError(Errors.SHIPMENT_STATUS_INVALID);
    }
  }

  private validatePackage(packages: PackageEntity, shipmentId: number) {
    if (!packages) {
      this.logger.warn({
        event: 'shipmentService.validatePackage.guideNotFound',
        warning: Errors.GUIDE_NOT_FOUND,
      });
      throw new GraphQLError(Errors.GUIDE_NOT_FOUND);
    }

    if (packages.shipmentId !== shipmentId) {
      this.logger.warn({
        event: 'shipmentService.validatePackage.guideNotFoundInShipment',
        warning: Errors.GUIDE_NOT_FOUND_SHIPMENT,
      });
      throw new GraphQLError(Errors.GUIDE_NOT_FOUND_SHIPMENT);
    }
  }

  public async closePackage(
    input: InputClosePackageDTO | InputCancelPackageDTO,
  ) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const hasCanceled = input instanceof InputCancelPackageDTO;
      this.logger.debug({
        event: 'shipmentService.closePackage.input',
        data: { ...input, hasCanceled },
      });
      let status: number;
      if ('statusCancelation' in input) {
        status = input.statusCancelation;
      }
      const { evidence, packageId, shipmentId } = input;

      const [shipment] = await queryRunner.manager.find(ShipmentEntity, {
        where: { id: shipmentId },
      });

      this.logger.debug({
        event: 'shipmentService.closePackage.shipmentEntity',
        data: shipment,
      });

      this.validateShipmentStatus(shipment, ShipmentStatusEnum.IN_PROCESS);

      const [packages]: PackageEntity[] = await queryRunner.manager.find(
        PackageEntity,
        { where: { id: packageId } },
      );

      this.logger.debug({
        event: 'shipmentService.closePackage.packageEntity',
        data: packages,
      });

      this.validatePackage(packages, shipment.id);

      if (!hasCanceled && packages.statusId !== PackageStatusEnum.PL) {
        throw new GraphQLError(Errors.INVALID_PACKAGE_STATUS);
      }

      this.logger.debug({
        event: 'shipmentService.openPackage.packagesEntity',
        data: packages,
      });

      const pack: PackageEntity[] = await queryRunner.manager.find(
        PackageEntity,
        {
          where: {
            shipmentId: shipmentId,
          },
        },
      );

      if (hasCanceled) {
        await queryRunner.manager.update(PackageEntity, packageId, {
          statusId: status,
        });

        await queryRunner.manager.save(PackageHistoryEntity, {
          status: getStatusByIdStatus(status),
          idPackage: packageId,
          description: getStatusDescriptionByIdStatus(status),
        });

        await queryRunner.manager.save(EvidenceEntity, {
          ...evidence,
          packageId: packages.id,
        });

        await queryRunner.commitTransaction();
        return shipment;
      }

      await queryRunner.manager.save(EvidenceEntity, {
        ...evidence,
        packageId: packages.id,
      });

      await queryRunner.manager.update(PackageEntity, packageId, {
        statusId: PackageStatusEnum.DE,
      });

      await queryRunner.manager.save(PackageHistoryEntity, {
        status: getStatusByIdStatus(PackageStatusEnum.DE),
        idPackage: packageId,
        description: getStatusDescriptionByIdStatus(PackageStatusEnum.DE),
      });

      const packClose: PackageEntity[] = await queryRunner.manager.find(
        PackageEntity,
        {
          where: {
            shipmentId: shipmentId,
          },
        },
      );

      const includeCancelation = packClose.some((pack) =>
        PackageStatusCloselTypes.includes(pack.statusId),
      );

      this.logger.debug({
        event: 'shipmentService.closePackage.closeShipment',
        data: {
          lengthPack: packClose.length,
          includeCancelation,
        },
      });

      if (!includeCancelation) {
        await queryRunner.manager.update(ShipmentEntity, shipment.id, {
          shipmentStatusId: ShipmentStatusEnum.COMPLETED,
        });
      }
      await queryRunner.commitTransaction();
      return shipment;
    } catch (error) {
      await validTransaction(queryRunner);
      throw new GraphQLError(error?.message || error);
    } finally {
      await queryRunner.release();
    }
  }
}
