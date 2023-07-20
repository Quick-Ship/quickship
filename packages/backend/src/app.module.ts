import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

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

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      cache: true,
      isGlobal: true,
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
      playground: true,
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
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
