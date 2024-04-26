import { Module } from '@nestjs/common';
import { BlogCommentModule } from '@project/comment';
import { PostModule } from '@project/post';
import { BlogConfigModule } from '@project/blog-config';

@Module({
  imports: [BlogConfigModule, BlogCommentModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
