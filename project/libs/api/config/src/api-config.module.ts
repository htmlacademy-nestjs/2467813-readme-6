import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import apiConfig from './configurations/app.config';
import { PathEnvironments } from '@project/constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [apiConfig],
      envFilePath: PathEnvironments.Api,
    }),
  ],
})
export class ApiConfigModule {}
