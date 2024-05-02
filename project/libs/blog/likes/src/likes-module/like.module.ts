import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeRepository } from './like.repository';
import { LikeFactory } from './like.factory';
import { PrismaClientModule } from '@project/models';

@Module({
  imports: [PrismaClientModule],
  controllers: [],
  providers: [LikeService, LikeRepository, LikeFactory],
  exports: [LikeService, LikeRepository],
})
export class LikeModule {}
