import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppRoutes, DEFAULT_HOST, SpaceName } from '@project/constant';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getFullServerPath } from '@project/helpers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(AppRoutes.Api);

  const config = new DocumentBuilder()
    .setTitle('The File service')
    .setDescription('File service API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(AppRoutes.Swagger, app, document);

  const configService = app.get(ConfigService);
  const port = configService.get(`${SpaceName.AppFile}.port`);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: ${getFullServerPath(DEFAULT_HOST, port)}/${
      AppRoutes.Api
    }`
  );
}

bootstrap();
