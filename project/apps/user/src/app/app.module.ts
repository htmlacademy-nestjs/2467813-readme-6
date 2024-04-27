import { Module } from '@nestjs/common';

import { BlogUserModule } from '@project/blog-user';
import { AuthenticationModule } from '@project/authentication';
import { AccountConfigModule, getMongooseOptions } from '@project/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AccountConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    BlogUserModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
