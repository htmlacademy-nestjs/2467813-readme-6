import { Injectable } from '@nestjs/common';

import { IComment, IEntityFactory } from '@project/core';
import { BlogCommentEntity } from './blog-comment.entity';

@Injectable()
export class BlogCommentFactory implements IEntityFactory<BlogCommentEntity> {
  public create(entityPlainData: IComment): BlogCommentEntity {
    return new BlogCommentEntity(entityPlainData);
  }
}
