import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  const database = {
    url: process.env.DATABASE_URL,
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE,
    type: 'postgres',
    autoLoadEntities: true,
    //migrationsRun: true,
    logging: true,
    //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    //synchronize: true,
    ssl: {
      rejectUnauthorized: false,
    },
  };

  return { database };
});
