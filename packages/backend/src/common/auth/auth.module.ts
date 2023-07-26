import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

/*Local Imports */
import { AuthStrategy } from './auth.strategy';
import { FireBaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FireBaseModule, PassportModule],
  providers: [AuthStrategy],
})
export class AuthModule {}
