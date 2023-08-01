import { Module, UseGuards } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

/*Local Import */
import { GqlAuthGuard } from 'src/common/auth/auth.guard';
import { FireBaseModule } from 'src/common/firebase/firebase.module';
import { UserEntity } from './entities/user.entity';
import { UserService } from './users.service';
import { UserDTO } from './dtos/user.dto';
import { RegisterUserDTO } from './dtos/register-user-dto';
import { UserResolver } from './users.resolver';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([UserEntity]),
        FireBaseModule,
      ],
      services: [UserService],
      resolvers: [
        {
          aggregate: { enabled: true },
          delete: { disabled: true },
          create: { disabled: true },
          DTOClass: UserDTO,
          EntityClass: UserEntity,
          ServiceClass: UserService,
          CreateDTOClass: RegisterUserDTO,
          read: {
            decorators: [UseGuards(GqlAuthGuard)],
          },
          update: { decorators: [UseGuards(GqlAuthGuard)] },
        },
      ],
    }),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
