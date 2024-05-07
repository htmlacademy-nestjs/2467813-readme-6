import { Injectable } from '@nestjs/common';

import { IComment, IEntityFactory } from '@project/core';

import { LikeEntity } from './like.entity';

@Injectable()
export class LikeFactory implements IEntityFactory<LikeEntity> {
  public create(entityPlainData: IComment): LikeEntity {
    return new LikeEntity(entityPlainData);
  }
}
