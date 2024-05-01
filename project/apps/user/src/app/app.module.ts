import { Module } from '@nestjs/common';

import { BlogUserModule } from '@project/blog-user';
import { AuthenticationModule } from '@project/authentication';
import { AccountConfigModule, getMongooseOptions } from '@project/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyModule } from '@project/notify-module';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    AccountConfigModule,
    BlogUserModule,
    AuthenticationModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
