import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { GraphQLError } from 'graphql';

/*Local Imports */
import { ShipmentEntity } from './entities/shipment.entity';
import { InputGenerateShipmentDTO } from './dto/generate-shipment.dto';
import { PackageEntity } from '../packages/entities/package.entity';
import { PackageHistoryEntity } from '../package-history/entities/package-history.entity';
import { InputAddPackageShipmentDTO } from './dto/add-packages-shipment.dto';
import { InputAssignCourierDTO } from './dto/assign-courier.dto';
import { Error } from 'src/common/errors.enum';
import { ShipmentStatusEnum } from 'src/common/shipment-status-enum';
import { PackageStatusDescriptionEnum } from 'src/common/package-status-description.enum';
import { PackageStatusEnum } from 'src/common/package-status.enum';
import { InputOpenPackageDTO } from './dto/open-package.dto';

@QueryService(ShipmentEntity)
export class ShipmentService extends TypeOrmQueryService<ShipmentEntity> {
  constructor(
    @InjectRepository(ShipmentEntity) repo: Repository<ShipmentEntity>,
  ) {
    super(repo);
  }

  public async generateShipment(input: InputGenerateShipmentDTO) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const shipment = await queryRunner.manager.save(ShipmentEntity, {
        comments: input.comments,
        price: 0,
        warehouseShipmentId: input.warehouseShipmentId,
        shipmentStatusId: ShipmentStatusEnum.PENDING,
      });

      await queryRunner.commitTransaction();

      return shipment;
    } catch (error) {
      if (queryRunner.isTransactionActive)
        await queryRunner.rollbackTransaction();
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
      const [shipment] = await queryRunner.manager.find(ShipmentEntity, {
        where: { id: input.shipmentId },
      });

      const packages = await queryRunner.manager.query(
        `select * from packages where guide in (${input.guides.map(
          (g) => `'${g}'`,
        )})`,
      );

      await Promise.all(
        packages.map(async (pack) => {
          await queryRunner.manager.update(PackageEntity, pack.id, {
            shipmentId: shipment.id,
            statusId: PackageStatusEnum.PU,
          });

          await queryRunner.manager.save(PackageHistoryEntity, {
            status: 'PU',
            idPackage: pack.id,
            description: PackageStatusDescriptionEnum.PU,
          });

          await queryRunner.manager.save(PackageHistoryEntity, {
            status: 'WC',
            idPackage: pack.id,
            description: PackageStatusDescriptionEnum.WC,
          });
        }),
      );

      await queryRunner.commitTransaction();

      return shipment;
    } catch (error) {
      if (queryRunner.isTransactionActive)
        await queryRunner.rollbackTransaction();
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
      const [shipment] = await queryRunner.manager.find(ShipmentEntity, {
        where: { id: input.shipmentId },
      });

      this.validateShipmentStatus(shipment, ShipmentStatusEnum.PENDING);

      const [currentShipment] = await queryRunner.manager.find(ShipmentEntity, {
        where: {
          messengerId: input.courierId,
          shipmentStatusId: ShipmentStatusEnum.IN_PROCESS,
        },
      });

      if (currentShipment) {
        throw new GraphQLError(Error.COURIER_INVALID);
      }

      await queryRunner.manager.update(ShipmentEntity, shipment.id, {
        messengerId: input.courierId,
        shipmentStatusId: ShipmentStatusEnum.IN_PROCESS,
      });

      await queryRunner.commitTransaction();

      return shipment;
    } catch (error) {
      if (queryRunner.isTransactionActive)
        await queryRunner.rollbackTransaction();
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
      const [shipment] = await queryRunner.manager.find(ShipmentEntity, {
        where: { id: input.shipmentId },
      });

      this.validateShipmentStatus(shipment, ShipmentStatusEnum.IN_PROCESS);

      const [packages] = await queryRunner.manager.find(PackageEntity, {
        where: { id: input.packageId },
      });

      if (!packages) {
        throw new GraphQLError(Error.GUIDE_NOT_FOUND);
      }

      if (packages.shipmentId !== shipment.id) {
        throw new GraphQLError(Error.GUIDE_NOT_FOUND_SHIPMENT);
      }

      await queryRunner.manager.update(PackageEntity, packages.id, {
        statusId: PackageStatusEnum.PL,
      });

      await queryRunner.manager.save(PackageHistoryEntity, {
        status: 'PL',
        idPackage: packages.id,
        description: PackageStatusDescriptionEnum.PL,
      });

      await queryRunner.commitTransaction();

      return shipment;
    } catch (error) {
      if (queryRunner.isTransactionActive)
        await queryRunner.rollbackTransaction();
      throw new GraphQLError(error?.message || error);
    } finally {
      await queryRunner.release();
    }
  }

  private async validateShipmentStatus(
    shipment: ShipmentEntity,
    status: ShipmentStatusEnum,
  ) {
    if (!shipment) {
      throw new GraphQLError(Error.SHIPMENT_NOT_FOUND);
    }

    if (shipment?.shipmentStatusId !== status) {
      throw new GraphQLError(Error.SHIPMENT_STATUS_INVALID);
    }
  }
}
