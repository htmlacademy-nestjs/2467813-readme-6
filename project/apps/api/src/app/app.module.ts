import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpClient } from '@project/constant';
import { UsersController } from './users.controller';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { BlogController } from './blog.controller';
import { ApiConfigModule } from '@project/api-config';
import { CommentController } from './comment.controller';
import { LikeController } from './like.controller';
import { RepostController } from './repost.controller';
import { NotificationController } from './notification.controller';

@Module({
  imports: [
    ApiConfigModule,
    HttpModule.register({
      timeout: HttpClient.Timeout,
      maxRedirects: HttpClient.MaxRedirects,
    }),
  ],
  controllers: [
    UsersController,
    BlogController,
    CommentController,
    LikeController,
    RepostController,
    NotificationController,
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
