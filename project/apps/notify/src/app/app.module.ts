import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotifyConfigModule, getMongooseOptions } from '@project/notify-config';
import { EmailSubscriberModule } from '@project/email-subscriber';
// import { getMongooseOptions } from '@project/helpers';
import { SpaceName } from '@project/constant';

@Module({
  imports: [
    // MongooseModule.forRootAsync(getMongooseOptions(SpaceName.AppNotify)),
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyConfigModule,
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
