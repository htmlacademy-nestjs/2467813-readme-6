import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/models';
import { PostModule } from '@project/post';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { CommentFactory } from './comment.factory';

@Module({
  imports: [PrismaClientModule, PostModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, CommentFactory],
  exports: [CommentService, CommentRepository],
})
export class CommentModule {}
