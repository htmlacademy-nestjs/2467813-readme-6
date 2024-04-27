import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import fileConfig from './configurations/app.config';

const ENV_FILE_PATH = 'apps/file/file.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [fileConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
})
export class FileConfigModule {}
