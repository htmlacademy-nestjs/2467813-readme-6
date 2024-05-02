import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  constructor(private readonly likeRepository: LikeRepository) {}

  public async toggleLikes(userId: string, postId: string) {
    return await this.likeRepository.existingLike(userId, postId);
  }
}
