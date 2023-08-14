import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = app.get(Logger);
  const port = configService.get<number>('APLICATION_PORT', 3000);
  const env = configService.get<string>('NODE_ENV', 'staging');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessage = errors.map((error) =>
          Object.values(error.constraints).join(', '),
        );

        const errorMessageParse = errorMessage
          .map((error) => error.charAt(0).toUpperCase() + error.slice(1))
          .join(', ');

        return new BadRequestException(String(errorMessageParse));
      },
      forbidUnknownValues: false,
    }),
  );

  app.enableCors();
  await app.listen(port);
  logger.log(
    `Server is running at http://localhost:${port}/graphql, environmet ${env}`,
  );
}
bootstrap();
