/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AppRoutes, DEFAULT_HOST, DefaultPort } from '@project/constant';
import { getFullServerPath } from '@project/helpers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(AppRoutes.Api);

  const port = process.env.PORT || DefaultPort.AppPortApp;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: ${getFullServerPath(
      DEFAULT_HOST,
      Number(port)
    )}/${AppRoutes.Api}`
  );
}

bootstrap();
