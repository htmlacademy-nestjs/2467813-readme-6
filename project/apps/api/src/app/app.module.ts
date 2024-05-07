import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpClient } from '@project/constant';
import { UsersController } from './users.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { BlogController } from './blog.controller';
import { ApiConfigModule } from '@project/api-config';

@Module({
  imports: [
    ApiConfigModule,
    HttpModule.register({
      timeout: HttpClient.Timeout,
      maxRedirects: HttpClient.MaxRedirects,
    }),
  ],
  controllers: [UsersController, BlogController],
  providers: [CheckAuthGuard],
})
export class AppModule {}
