import { InjectRepository } from '@nestjs/typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Repository, getConnection } from 'typeorm';
import { GraphQLError } from 'graphql';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

/*Local Imports */
import { ClientEntity } from './entities/client.entity';
import { InputCreateClientDTO } from './dto/create-client.input';
import { validTransaction } from 'src/common/utils';
import { FirebaseService } from 'src/common/firebase/firebase.service';

@QueryService(ClientEntity)
export class ClientService extends TypeOrmQueryService<ClientEntity> {
  constructor(
    @InjectRepository(ClientEntity) repo: Repository<ClientEntity>,
    @InjectPinoLogger(ClientService.name)
    private readonly logger: PinoLogger,
    private readonly firebaseService: FirebaseService,
  ) {
    super(repo);
  }

  public async registerClient(input: InputCreateClientDTO) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.logger.debug({
        event: 'clientService.registerClient.input',
        data: input,
      });

      const client = await queryRunner.manager.save(ClientEntity, input);

      await this.firebaseService.registerFirebase({
        email: input.email,
        phone: input.phone,
        tenant: 'CLIENT',
        userId: client.id,
      });

      await queryRunner.commitTransaction();

      return client;
    } catch (error) {
      await validTransaction(queryRunner);
      throw new GraphQLError(error?.message || error);
    } finally {
      await queryRunner.release();
    }
  }
}
