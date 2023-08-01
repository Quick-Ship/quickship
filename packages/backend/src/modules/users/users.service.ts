import { InjectRepository } from '@nestjs/typeorm';
import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Repository, getConnection } from 'typeorm';
import { GraphQLError } from 'graphql';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

/*Local Imports */

import { validTransaction } from 'src/common/utils';
import { FirebaseService } from 'src/common/firebase/firebase.service';
import { UserEntity } from './entities/user.entity';
import { RegisterUserResponseDTO } from './dtos/register-user.response.dto';
import { RegisterUserDTO } from './dtos/register-user-dto';

@QueryService(UserEntity)
export class UserService extends TypeOrmQueryService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) repo: Repository<UserEntity>,
    @InjectPinoLogger(UserService.name)
    private readonly logger: PinoLogger,
    private readonly firebaseService: FirebaseService,
  ) {
    super(repo);
  }

  public async registerUser(
    input: RegisterUserDTO,
  ): Promise<RegisterUserResponseDTO> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      this.logger.debug({
        event: 'clientService.registerUser.input',
        data: input,
      });

      const user = await queryRunner.manager.save(UserEntity, input);

      const url = await this.firebaseService.registerFirebase({
        email: input.email,
        phone: input.phone,
        tenant: 'USER',
        userId: user.id,
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
}
