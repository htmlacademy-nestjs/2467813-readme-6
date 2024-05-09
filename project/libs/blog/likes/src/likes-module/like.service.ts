import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { CreateLikeDto } from '@project/post';

@Injectable()
export class LikeService {
  constructor(private readonly likeRepository: LikeRepository) {}

  public async toggleLikes(dto: CreateLikeDto, postId: string) {
    return await this.likeRepository.existingLike(
      dto.userId,
      postId,
      dto.isLike
    );
  }
}
