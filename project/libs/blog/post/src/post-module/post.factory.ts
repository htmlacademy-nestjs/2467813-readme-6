import { Injectable } from '@nestjs/common';

import { IEntityFactory, IPost } from '@project/core';

import { PostEntity } from './post.entity';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostFactory implements IEntityFactory<PostEntity> {
  public create(entityPlainData: IPost): PostEntity {
    return new PostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto: CreatePostDto): PostEntity {
    const entity = new PostEntity();
    entity.title = dto.title;
    entity.userId = dto.userId;

    return entity;
  }
}
