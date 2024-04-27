import { Module } from '@nestjs/common';
import { CommentModule } from '@project/comment';
import { PostModule } from '@project/post';
import { BlogConfigModule } from '@project/blog-config';

@Module({
  imports: [BlogConfigModule, CommentModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
