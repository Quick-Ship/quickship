import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

/*Local Imports */
import { IPayloadUser } from './interfaces/auth.interface';
import { FirebaseService } from '../firebase/firebase.service';
import { Errors } from '../enums/errors.enum';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    @InjectPinoLogger(AuthStrategy.name)
    private readonly logger: PinoLogger,
    private readonly firebaseAuth: FirebaseService,
  ) {
    super(
      async (token: string, done: (error: unknown, user?: unknown) => void) => {
        try {
          const verifyToken = await this.firebaseAuth.verifyIdToken(token);

          this.logger.debug({
            event: 'authStrategy.verifyIdToken.response',
            data: verifyToken,
          });

          if (verifyToken) {
            const verifyEmail = verifyToken.email_verified;
            if (!verifyEmail) {
              return done(
                new UnauthorizedException({
                  statusCode: 401,
                  message: 'Email no verificado',
                }),
              );
            }

            const user: IPayloadUser = {
              id: verifyToken?.idUser,
              email: verifyToken?.email,
              tenant: verifyToken?.tenant,
            };

            return done(undefined, user);
          } else {
            return done(
              new UnauthorizedException({
                statusCode: 401,
                message: Errors.TOKEN_NOT_INFO,
              }),
            );
          }
        } catch (error) {
          this.logger.error({
            event: 'authStrategy.error',
            error: error.message,
          });
          // const errorMessage: string = error.message || error;
          // if (errorMessage.startsWith('The token has expired')) {
          //   return done(
          //     new UnauthorizedException({
          //       statusCode: 401,
          //       message: Errors.TOKEN_EXPIRED,
          //     }),
          //   );
          // }

          return done(
            new UnauthorizedException({
              statusCode: 401,
              message: Errors.TOKEN_IVALID,
            }),
          );
        }
      },
    );
  }
}
