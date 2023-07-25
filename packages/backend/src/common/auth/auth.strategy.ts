import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';
import { Strategy } from 'passport-http-bearer';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

/*Local Imports */
import { IPayloadUser } from './interfaces/auth.interface';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    @InjectPinoLogger(AuthStrategy.name)
    private readonly logger: PinoLogger,
    private readonly firebaseAuth: FirebaseAuthenticationService,
  ) {
    super(
      async (token: string, done: (error: unknown, user?: unknown) => void) => {
        try {
          const verifyToken = await this.firebaseAuth.verifyIdToken(token);

          console.log(verifyToken);

          if (verifyToken) {
            // const verifyEmail = verifyToken.email_verified
            // if (!verifyEmail) {
            //   return done(
            //     new UnauthorizedException({
            //       statusCode: 401,
            //       message: 'Email no verificado',
            //     }),
            //   );
            // }
            // const expiredToken = verifyToken.exp;
            // const dataInit = new Date().getMilliseconds();
            // const dateExpired = new Date(expiredToken).getMilliseconds();

            // console.log(dataInit, dateExpired);

            // const [client] = await this.clientsService.query({
            //   filter: { email: { eq: verifyToken.email } },
            // });

            const user: IPayloadUser = {
              id: verifyToken?.id,
              email: verifyToken?.email,
              tenant: 'CLIENT',
            };

            return done(undefined, user);
          } else {
            return done(
              new UnauthorizedException({
                statusCode: 401,
                message: 'The token has not info',
              }),
            );
          }
        } catch (error) {
          this.logger.error(error.message);

          return done(
            new UnauthorizedException({
              statusCode: 401,
              message: 'The token is invalid',
            }),
          );
        }
      },
    );
  }
}
