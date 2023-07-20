import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

/*Local Imports */
import { WarehouseShipmentEntity } from './entities/warehouse-shipment.entity';
import { InputCreateWarehouseShipmentDTO } from './dto/create-warehouse-shipment.input';
import { GraphQLError } from 'graphql';
import { ContactEntity } from '../contact/entities/contact.entity';
import { DirectionEntity } from '../directions/entities/direction.entity';

@QueryService(WarehouseShipmentEntity)
export class WarehouseShipmentService extends TypeOrmQueryService<WarehouseShipmentEntity> {
  constructor(
    @InjectRepository(WarehouseShipmentEntity)
    repo: Repository<WarehouseShipmentEntity>,
  ) {
    super(repo);
  }

  public async createWarehouseShipment(input: InputCreateWarehouseShipmentDTO) {
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

      const warehouseShipment = await queryRunner.manager.save(
        WarehouseShipmentEntity,
        {
          instructions: input.instructions,
          clientId: input.clientId,
          contactId: contact.id,
          directionId: direction.id,
        },
      );
      await queryRunner.commitTransaction();

      return warehouseShipment;
    } catch (error) {
      if (queryRunner.isTransactionActive)
        await queryRunner.rollbackTransaction();
      throw new GraphQLError(error?.message || error);
    } finally {
      await queryRunner.release();
    }
  }
}
