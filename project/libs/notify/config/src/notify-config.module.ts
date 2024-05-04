import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import notifyConfig from './notify.config';
import { PathEnvironments } from '@project/constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notifyConfig],
      envFilePath: PathEnvironments.Notify,
    }),
  ],
})
export class NotifyConfigModule {}
