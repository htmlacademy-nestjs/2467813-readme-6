import { Module, forwardRef } from '@nestjs/common';

import { PrismaClientModule } from '@project/models';
import { CommentModule } from '@project/comment';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostFactory } from './post.factory';

@Module({
  imports: [PrismaClientModule, forwardRef(() => CommentModule)],
  controllers: [PostController],
  providers: [PostService, PostRepository, PostFactory],
  exports: [PostService],
})
export class PostModule {}
