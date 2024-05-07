import { Injectable } from '@nestjs/common';

import { IRepost, IEntityFactory } from '@project/core';

import { RepostEntity } from './repost.entity';

@Injectable()
export class RespotFactory implements IEntityFactory<RepostEntity> {
  public create(entityPlainData: IRepost): RepostEntity {
    return new RepostEntity(entityPlainData);
  }
}
