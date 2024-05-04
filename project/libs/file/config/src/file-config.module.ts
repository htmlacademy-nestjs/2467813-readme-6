import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import fileConfig from './configurations/app.config';
import { PathEnvironments } from '@project/constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [fileConfig],
      envFilePath: PathEnvironments.File,
    }),
  ],
})
export class FileConfigModule {}
