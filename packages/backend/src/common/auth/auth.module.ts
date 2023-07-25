import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import * as admin from 'firebase-admin';
import { HttpModule } from '@nestjs/axios';

/*Local Imports */
import appConfig from 'src/config/app.config';
import { AuthStrategy } from './auth.strategy';
import { ClientModule } from 'src/modules/client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      cache: true,
    }),
    FirebaseAdminModule.forRootAsync({
      inject: [appConfig.KEY],
      useFactory: async (config: ConfigType<typeof appConfig>) => ({
        credential: admin.credential.cert(
          JSON.parse(
            Buffer.from(String(config.auth.serviceAccount), 'base64').toString(
              'ascii',
            ),
          ),
        ),
      }),
    }),
    PassportModule,
    HttpModule,
    ClientModule,
  ],
  providers: [AuthStrategy],
})
export class AuthModule {}
