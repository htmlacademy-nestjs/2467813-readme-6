import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotifyConfigModule, getMongooseOptions } from '@project/notify-config';
import { EmailSubscriberModule } from '@project/email-subscriber';

@Module({
  imports: [
    NotifyConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
