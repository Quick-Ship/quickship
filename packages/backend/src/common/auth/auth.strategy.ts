import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

/*Local Imports */

import { FirebaseService } from '../firebase/firebase.service';
import { Errors } from '../enums/errors.enum';
import { IPayloadUser } from './interfaces/auth.interface';

@Injectable()
export class AuthStrategy implements CanActivate {
  constructor(
    @InjectPinoLogger(AuthStrategy.name)
    private readonly logger: PinoLogger,
    private readonly firebaseAuth: FirebaseService,
  ) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    {
      try {
        const request = context.switchToHttp().getRequest();
        const tokenBearer = request.headers['authorization'];

        if (!tokenBearer) {
          throw new UnauthorizedException(Errors.TOKEN_NOT_INFO);
        }

        const token = tokenBearer.replace('Bearer ', '');

        const verifyToken = await this.firebaseAuth.verifyIdToken(token);

        this.logger.debug({
          evet: 'JWTAuthGuard.verifyToken.response',
          data: verifyToken,
        });

        if (!verifyToken) {
          throw new UnauthorizedException(Errors.TOKEN_IVALID);
        }

        if (!verifyToken.email_verified) {
          throw new UnauthorizedException(Errors.EMAIL_NOT_VERIFIED);
        }

        const user: IPayloadUser = {
          email: verifyToken.email,
          tenant: verifyToken.tenant,
          id: verifyToken.idUser,
        };
        context.switchToHttp().getRequest().user = user;
        return true;
      } catch (error) {
        throw new UnauthorizedException(error);
      }
    }
  }
}
