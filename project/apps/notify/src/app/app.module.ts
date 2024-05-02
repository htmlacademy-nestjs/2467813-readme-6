import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotifyConfigModule } from '@project/notify-config';
import { EmailSubscriberModule } from '@project/email-subscriber';
import { getMongooseOptions } from '@project/helpers';
import { SpaceName } from '@project/constant';

@Module({
  imports: [
    MongooseModule.forRootAsync(
      getMongooseOptions(`${SpaceName.AppNotify}.db`)
    ),
    NotifyConfigModule,
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
