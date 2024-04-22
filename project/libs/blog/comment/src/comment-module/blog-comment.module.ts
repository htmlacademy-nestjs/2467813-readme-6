import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/models';
import { PostModule } from '@project/post';

import { BlogCommentController } from './blog-comment.controller';
import { BlogCommentService } from './blog-comment.service';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentFactory } from './blog-comment.factory';

@Module({
  imports: [PrismaClientModule, PostModule],
  controllers: [BlogCommentController],
  providers: [BlogCommentService, BlogCommentRepository, BlogCommentFactory],
})
export class BlogCommentModule {}
