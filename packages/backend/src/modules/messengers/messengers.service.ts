import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';

/*Local Imports */
import { MessengerEntity } from './entities/messenger.entity';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FirebaseService } from 'src/common/firebase/firebase.service';
import { InputRegisterCourierDTO } from './dto/register-messenger.dto';
import { validTransaction } from 'src/common/utils';
import { GraphQLError } from 'graphql';
import { ResponseRegisterCourierDTO } from './dto/register-courier-response.dto';
import { ViewerDTO } from '../users/dtos/viewer.dto';
import { IPayloadUser } from 'src/common/auth/interfaces/auth.interface';
import { UnauthorizedException } from '@nestjs/common';
import { Errors } from 'src/common/enums/errors.enum';

@QueryService(MessengerEntity)
export class MessengersService extends TypeOrmQueryService<MessengerEntity> {
  constructor(
    @InjectRepository(MessengerEntity) repo: Repository<MessengerEntity>,
    @InjectPinoLogger(MessengersService.name)
    private readonly logger: PinoLogger,
    private readonly firebaseService: FirebaseService,
  ) {
    super(repo);
  }

  public async registerCourier(
    input: InputRegisterCourierDTO,
  ): Promise<ResponseRegisterCourierDTO> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.logger.debug({
        event: 'clientService.registerClient.input',
        data: input,
      });

      const courier = await queryRunner.manager.save(MessengerEntity, {
        ...input,
        courierActivityId: 2,
      });

      const url = await this.firebaseService.registerFirebase({
        email: input.email,
        phone: input.phone,
        tenant: 'COURIER',
        userId: courier.id,
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
        event: 'messengerService.viewer.input',
        data: input,
      });
      if (input.tenant !== 'COURIER') {
        throw new UnauthorizedException();
      }
      const user = await this.repo.findOne(input.id);

      if (!user) {
        this.logger.warn({
          event: 'messengerService.viewer.userNotExist',
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
        event: 'messengerService.viewer.response',
        data: response,
      });
      return response;
    } catch (error) {
      this.logger.error({
        event: 'messengerService.viewer.error',
        error: error,
      });
      throw new GraphQLError(error);
    }
  }
}
