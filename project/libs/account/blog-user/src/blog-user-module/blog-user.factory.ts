import { IAuthUser, IEntityFactory } from '@project/core';
import { BlogUserEntity } from './blog-user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogUserFactory implements IEntityFactory<BlogUserEntity> {
  public create(entityPlainData: IAuthUser): BlogUserEntity {
    return new BlogUserEntity(entityPlainData);
  }
}
