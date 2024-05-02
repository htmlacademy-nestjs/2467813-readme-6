import { Module } from '@nestjs/common';

import { BlogUserModule } from '@project/blog-user';
import { AuthenticationModule } from '@project/authentication';
import { AccountConfigModule } from '@project/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyModule } from '@project/notify-module';
import { getMongooseOptions } from '@project/helpers';
import { SpaceName } from '@project/constant';

@Module({
  imports: [
    AuthenticationModule,
    AccountConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions(SpaceName.MongoDB)),
    BlogUserModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
