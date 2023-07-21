import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      cache: true,
      isGlobal: true,
    }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          pinoHttp: {
            level: configService.get<string>('config.app.logLevel', 'info'),
          },
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.get('config.database');
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      playground: process.env.NODE_ENV === 'staging',
      introspection: process.env.NODE_ENV === 'staging',
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
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
