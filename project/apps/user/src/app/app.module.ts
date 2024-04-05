import { Module } from '@nestjs/common';

import { BlogUserModule } from '@project/blog-user';
import { AuthenticationModule } from '@project/authentication';
import { AccountConfigModule } from '@project/config';

@Module({
  imports: [AccountConfigModule, BlogUserModule, AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
