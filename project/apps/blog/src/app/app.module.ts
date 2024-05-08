import { Module } from '@nestjs/common';
import { CommentModule } from '@project/comment';
import { PostModule } from '@project/post';
import { BlogConfigModule } from '@project/blog-config';
import { LikeModule } from '@project/likes';
import { NotifyBlogModule } from '@project/blog-notify';

@Module({
  imports: [
    BlogConfigModule,
    CommentModule,
    PostModule,
    LikeModule,
    NotifyBlogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
