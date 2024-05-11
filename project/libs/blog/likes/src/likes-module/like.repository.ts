import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaClientService } from '@project/models';
import { ILike } from '@project/core';

import { BasePostgresRepository } from '@project/data-access';
import { LikeEntity } from './like.entity';
import { LikeFactory } from './like.factory';
import { ExceptionMessage } from '@project/constant';

@Injectable()
export class LikeRepository extends BasePostgresRepository<LikeEntity, ILike> {
  constructor(
    entityFactory: LikeFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async existingLike(
    userId: string,
    postId: string,
    isLike: boolean
  ): Promise<boolean> {
    const existingLike = await this.client.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike && isLike) {
      throw new ForbiddenException(ExceptionMessage.LikeForbidden);
    }

    if (!existingLike && !isLike) {
      throw new NotFoundException(ExceptionMessage.LikeNotFound);
    }

    if (existingLike) {
      await this.deleteById(existingLike.id);
      return false;
    } else {
      await this.saveLike(userId, postId);
      return true;
    }
  }

  public async saveLike(userId: string, postId: string): Promise<void> {
    await this.client.like.create({
      data: {
        userId,
        postId,
      },
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.like.delete({
      where: {
        id,
      },
    });
  }
}
