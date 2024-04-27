import { Module } from '@nestjs/common';
import { BlogCommentModule } from '@project/comment';
import { PostModule } from '@project/post';

@Module({
  imports: [BlogCommentModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
