import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpClient } from '@project/constant';
import { UsersController } from './users.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: HttpClient.Timeout,
      maxRedirects: HttpClient.MaxRedirects,
    }),
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
