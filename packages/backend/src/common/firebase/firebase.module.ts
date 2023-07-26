import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import * as admin from 'firebase-admin';

/*Local Imports */
import appConfig from 'src/config/app.config';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [
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
  ],
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FireBaseModule {}
