import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';
import { Strategy } from 'passport-http-bearer';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { HttpService } from '@nestjs/axios';

/*Local Imports */
import appConfig from 'src/config/app.config';
import { ClientService } from 'src/modules/client/client.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    @InjectPinoLogger(AuthStrategy.name)
    private readonly logger: PinoLogger,
    private readonly firebaseAuth: FirebaseAuthenticationService,
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
    private readonly httpService: HttpService,
    private readonly clientsService: ClientService,
  ) {
    super(
      async (token: string, done: (error: unknown, user?: unknown) => void) => {
        try {
          const verifyToken = await this.firebaseAuth.verifyIdToken(token);

          if (verifyToken) {
            const user = {
              id: String(verifyToken?.customClaims?.idUser),
              email: verifyToken?.email,
              username: verifyToken?.displayName,
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
