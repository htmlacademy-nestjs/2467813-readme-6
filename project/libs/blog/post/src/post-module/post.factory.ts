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
    entity.userId = dto.userId;
    entity.title = dto.title;
    entity.typePost = dto.typePost;
    entity.announcementPublic = dto.announcementPublic;
    entity.textPublic = dto.textPublic;
    entity.videoUrl = dto.videoUrl;
    entity.image = dto.image;
    entity.textQuote = dto.textQuote;
    entity.quoteAuthor = dto.quoteAuthor;
    entity.link = dto.link;
    entity.linkDescription = dto.linkDescription;
    entity.tags = dto.tags;
    entity.isPublished = dto.isPublished;

    return entity;
  }
}
