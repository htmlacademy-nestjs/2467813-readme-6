import { Injectable } from '@nestjs/common';

import { IComment, IEntityFactory } from '@project/core';

import { LikeEntity } from './like.entity';
import { CreateLikeDto } from '../dto/create-like.dto';

@Injectable()
export class LikeFactory implements IEntityFactory<LikeEntity> {
  public create(entityPlainData: IComment): LikeEntity {
    return new LikeEntity(entityPlainData);
  }

  public createFromDto(dto: CreateLikeDto, postId: string): LikeEntity {
    return new LikeEntity({
      ...dto,
      postId,
    });
  }
}
