import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import applicationConfig from './configurations/app.config';

const ENV_FILE_PATH = 'apps/blog/blog.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig],
      envFilePath: ENV_FILE_PATH
    }),
  ]
})
export class BlogConfigModule {}
