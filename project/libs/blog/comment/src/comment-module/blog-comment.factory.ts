import { Injectable } from '@nestjs/common';

import { IComment, IEntityFactory } from '@project/core';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class BlogCommentFactory implements IEntityFactory<BlogCommentEntity> {
  public create(entityPlainData: IComment): BlogCommentEntity {
    return new BlogCommentEntity(entityPlainData);
  }

  public createFromDto(
    dto: CreateCommentDto,
    postId: string
  ): BlogCommentEntity {
    return new BlogCommentEntity({
      ...dto,
      postId,
    });
  }
}
