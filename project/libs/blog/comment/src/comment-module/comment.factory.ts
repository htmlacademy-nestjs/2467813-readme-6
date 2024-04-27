import { Injectable } from '@nestjs/common';

import { IComment, IEntityFactory } from '@project/core';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class CommentFactory implements IEntityFactory<CommentEntity> {
  public create(entityPlainData: IComment): CommentEntity {
    return new CommentEntity(entityPlainData);
  }

  public createFromDto(dto: CreateCommentDto, postId: string): CommentEntity {
    return new CommentEntity({
      ...dto,
      postId,
    });
  }
}
