import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';
import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RegisterFirebase } from './interfaces/register-firebase.interface';
import { GraphQLError } from 'graphql';

@Injectable()
export class AuthService {
  constructor(
    @InjectPinoLogger(AuthService.name)
    private readonly logger: PinoLogger,
    private readonly firebaseAuth: FirebaseAuthenticationService,
  ) {}

  public async registerFirebase(input: RegisterFirebase) {
    try {
      const register = await this.firebaseAuth.createUser({
        email: input?.email,
        password: input?.password,
        phoneNumber: input?.phone,
      });
      this.logger.debug({
        event: 'authService.registerFirebase.response',
        data: register,
      });

      await this.firebaseAuth.setCustomUserClaims(register.uid, {
        idUser: input.userId,
        tenant: input.tenant,
      });

      const link = await this.firebaseAuth.generateEmailVerificationLink(
        register.email,
      );

      console.log(link);
    } catch (error) {
      this.logger.error({
        event: 'authService.registerFirebase.error',
        error: error,
      });
      throw new GraphQLError(error);
    }
  }
}
