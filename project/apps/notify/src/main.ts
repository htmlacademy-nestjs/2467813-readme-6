/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppRoutes, SpaceName } from '@project/constant';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(AppRoutes.Api);

  const config = new DocumentBuilder()
    .setTitle('The Notify service')
    .setDescription('Notify service API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(AppRoutes.Swagger, app, document);

  const configService = app.get(ConfigService);
  const port = configService.get(`${SpaceName.AppNotify}.port`);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${AppRoutes.Api}`
  );
}

bootstrap();
