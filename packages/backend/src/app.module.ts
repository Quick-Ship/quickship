import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { LoggerModule } from 'nestjs-pino';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { isArray } from 'class-validator';

/*Local Imports */
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { ClientModule } from './modules/client/client.module';
import appConfig from './config/app.config';
import { ContactModule } from './modules/contact/contact.module';
import { DirectionModule } from './modules/directions/directions.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { MessengersModule } from './modules/messengers/messengers.module';
import { PackageHistoryModule } from './modules/package-history/package-history.module';
import { PackagesModule } from './modules/packages/packages.module';
import { ShipmentModule } from './modules/shipment/shipment.module';
import { ShipmentStatusModule } from './modules/shipmet-status/shipment-status.module';
import { PackageStatusModule } from './modules/package-status/package-status.module';
import { WarehouseShipmentModule } from './modules/warehouse-shipment/warehouse-shipment.module';
import { EvidenceModule } from './modules/evidences/evidence.module';
import { AuthModule } from './common/auth/auth.module';
import { UserModule } from './modules/users/user.module';
import { CourierActivityModule } from './modules/courier-activity/courier-activity.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      cache: true,
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      inject: [appConfig.KEY],
      useFactory: async (config: ConfigType<typeof appConfig>) => {
        return {
          pinoHttp: {
            level: config.app.logLevel,
          },
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [appConfig.KEY],
      useFactory: async (config: ConfigType<typeof appConfig>) => ({
        ...config.database,
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      playground: process.env.NODE_ENV === 'staging',
      introspection: process.env.NODE_ENV === 'staging',
      persistedQueries: false, // <--- para deshabilitar los ataques de denegación de servicios.
      formatError: (error: GraphQLError) => {
        const formattedError: GraphQLFormattedError = {
          message: isArray(error.extensions?.response?.['message'])
            ? error.extensions?.response?.['message'][0]
            : error.extensions?.response?.['message'] ||
              error.extensions?.response ||
              error.message ||
              error.extensions?.response?.['message'] ||
              error.extensions?.exception?.['response']?.message ||
              error.extensions?.exception?.['message']?.message ||
              error.extensions?.exception?.['response'] ||
              error.extensions?.exception?.['message'] ||
              error?.extensions ||
              error,
        };

        return formattedError;
      },
    }),
    ClientModule,
    ContactModule,
    DirectionModule,
    InvoicesModule,
    MessengersModule,
    PackageHistoryModule,
    PackagesModule,
    ShipmentModule,
    ShipmentStatusModule,
    PackageStatusModule,
    WarehouseShipmentModule,
    EvidenceModule,
    AuthModule,
    UserModule,
    CourierActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
