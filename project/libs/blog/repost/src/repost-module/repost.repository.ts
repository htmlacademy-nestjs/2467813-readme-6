import { Injectable } from '@nestjs/common';

import { PrismaClientService } from '@project/models';
import { IRepost } from '@project/core';

import { BasePostgresRepository } from '@project/data-access';
import { RepostEntity } from './repost.entity';
import { RespotFactory } from './repost.factory';

@Injectable()
export class RepostRepository extends BasePostgresRepository<
  RepostEntity,
  IRepost
> {
  constructor(
    entityFactory: RespotFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async existingRepost(
    userId: string,
    postId: string
  ): Promise<boolean> {
    const existingLike = await this.client.repost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      await this.deleteById(existingLike.id);
      return false;
    } else {
      await this.saveRepost(userId, postId);
      return true;
    }
  }

  public async saveRepost(userId: string, postId: string): Promise<void> {
    await this.client.repost.create({
      data: {
        userId,
        postId,
      },
    });
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.repost.delete({
      where: {
        id,
      },
    });
  }
}
