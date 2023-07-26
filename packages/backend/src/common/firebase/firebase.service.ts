import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';
import { Injectable } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

/*Locl imports */
import { Errors } from '../enums/errors.enum';
import { RegisterFirebase } from '../auth/interfaces/register-firebase.interface';

@Injectable()
export class FirebaseService {
  public firebaseAuth: FirebaseAuthenticationService;
  constructor(
    @InjectPinoLogger(FirebaseService.name)
    private readonly logger: PinoLogger,
    private readonly firebase: FirebaseAuthenticationService,
  ) {
    this.firebaseAuth = this.firebase;
  }

  public async registerFirebase(input: RegisterFirebase) {
    try {
      this.logger.debug({
        event: 'authService.registerFirebase.input',
        data: input,
      });
      const register = await this.firebaseAuth.createUser({
        email: input?.email,
        password: 'fgjygmkj@3545',
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

      const link = await this.firebaseAuth.generatePasswordResetLink(
        register.email,
      );

      //TODO: Remover
      console.log(link);
    } catch (error) {
      this.logger.error({
        event: 'authService.registerFirebase.error',
        error: error,
      });
      throw new GraphQLError(error);
    }
  }

  public async verifyIdToken(token: string) {
    try {
      const verifyToken = await this.firebaseAuth.verifyIdToken(token);

      return verifyToken;
    } catch (error) {
      this.logger.error({
        event: 'authService.verifyIdToken.error',
        error: error,
      });

      const errorMessage: string = error.message;
      if (errorMessage.startsWith('Firebase ID token has expired')) {
        throw new GraphQLError(Errors.TOKEN_EXPIRED);
      }
      throw new GraphQLError(error);
    }
  }
}
