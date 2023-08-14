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
import { RegisterClientResponseDTO } from './dto/register-client-dto';
import { IPayloadUser } from 'src/common/auth/interfaces/auth.interface';
import { ViewerDTO } from '../users/dtos/viewer.dto';
import { UnauthorizedException } from '@nestjs/common';
import { Errors } from 'src/common/enums/errors.enum';

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

  public async registerClient(
    input: InputCreateClientDTO,
  ): Promise<RegisterClientResponseDTO> {
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

      const url = await this.firebaseService.registerFirebase({
        email: input.email,
        phone: input.phone,
        tenant: 'CLIENT',
        userId: client.id,
      });

      await queryRunner.commitTransaction();

      return { url: url };
    } catch (error) {
      await validTransaction(queryRunner);
      throw new GraphQLError(error?.message || error);
    } finally {
      await queryRunner.release();
    }
  }

  public async viewer(input: IPayloadUser): Promise<ViewerDTO> {
    try {
      this.logger.debug({
        event: 'clientService.viewer.input',
        data: input,
      });
      if (input.tenant !== 'CLIENT') {
        throw new UnauthorizedException();
      }
      const user = await this.repo.findOne(input.id);

      if (!user) {
        this.logger.warn({
          event: 'clientService.viewer.userNotExist',
          warn: Errors.USER_NOT_EXIST,
        });
        throw new GraphQLError(Errors.USER_NOT_EXIST);
      }

      const response: ViewerDTO = {
        userId: user.id,
        email: user.email,
        tenant: input.tenant,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      this.logger.debug({
        event: 'clientService.viewer.response',
        data: response,
      });
      return response;
    } catch (error) {
      this.logger.error({
        event: 'clientService.viewer.error',
        error: error,
      });
      throw new GraphQLError(error);
    }
  }
}
