import { Injectable } from '@nestjs/common';
import { RepostRepository } from './repost.repository';

@Injectable()
export class RepostService {
  constructor(private readonly repostRepository: RepostRepository) {}

  public async toggleRepost(userId: string, postId: string) {
    return await this.repostRepository.existingRepost(userId, postId);
  }
}
