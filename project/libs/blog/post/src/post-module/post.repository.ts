/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { IPaginationResult, IPost } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/models';

import { PostEntity } from './post.entity';
import { PostFactory } from './post.factory';
import { PostQuery } from './post.query';
import { getMessageNotFoundDocument } from '@project/helpers';
import { SortOption } from '@project/constant';
import { PostCount } from '../const';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, IPost> {
  constructor(
    entityFactory: PostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({
      where,
    });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async save(entity: PostEntity): Promise<void> {
    const pojoEntity = entity.toPOJO();
    const record = await this.client.post.create({
      data: {
        userId: pojoEntity.userId,
        title: pojoEntity.title,
        typePost: pojoEntity.typePost,
        announcementPublic: pojoEntity.announcementPublic,
        textPublic: pojoEntity.textPublic,
        videoUrl: pojoEntity.videoUrl,
        imageUrl: pojoEntity.imageUrl,
        textQuote: pojoEntity.textQuote,
        quoteAuthor: pojoEntity.quoteAuthor,
        link: pojoEntity.link,
        linkDescription: pojoEntity.linkDescription,
        tags: pojoEntity.tags,
        isPublished: pojoEntity.isPublished,
      },
    });

    entity.id = record.id;
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }

  public async findById(
    id: string,
    currentUserId?: string
  ): Promise<PostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            comments: true,
            likes: true,
            reposts: true,
          },
        },
        likes: {
          where: {
            userId: currentUserId ?? '',
          },
          select: {
            id: true,
          },
        },
        reposts: {
          where: {
            userId: currentUserId ?? '',
          },
          select: {
            id: true,
          },
        },
      },
    });

    if (!document) {
      throw new NotFoundException(getMessageNotFoundDocument('Post', id));
    }

    const { likes, reposts, ...postInfo } = document;
    const postEntity = this.createEntityFromDocument(
      postInfo as unknown as IPost
    );
    postEntity.comments = document._count?.comments;
    postEntity.likes = document._count?.likes;
    postEntity.reposts = document._count?.reposts;
    postEntity.isLike = likes.length > 0;
    postEntity.isRepost = reposts.length > 0;

    return postEntity;
  }

  public async update(entity: PostEntity): Promise<PostEntity> {
    const pojoEntity = entity.toPOJO();
    await this.client.post.update({
      where: {
        id: entity.id,
      },
      data: {
        userId: pojoEntity.userId,
        title: pojoEntity.title,
        typePost: pojoEntity.typePost,
        announcementPublic: pojoEntity.announcementPublic,
        textPublic: pojoEntity.textPublic,
        videoUrl: pojoEntity.videoUrl,
        imageUrl: pojoEntity.imageUrl,
        textQuote: pojoEntity.textQuote,
        quoteAuthor: pojoEntity.quoteAuthor,
        link: pojoEntity.link,
        linkDescription: pojoEntity.linkDescription,
        tags: pojoEntity.tags,
        isPublished: pojoEntity.isPublished,
        updatedAt: new Date(),
      },
    });

    return;
  }

  public async find(
    query?: PostQuery,
    currentUserId?: string
  ): Promise<IPaginationResult<PostEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    let take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput[] = [];

    if (currentUserId) {
      where.isPublished = query?.isPublished ?? true;
    } else {
      where.isPublished = true;
    }

    if (query?.search) {
      where.title = {
        contains: query?.search,
        mode: 'insensitive',
      };
      take = PostCount.SearchDefault;
    }

    if (query?.tags && query.tags.length > 0) {
      where.tags = {
        hasSome: query.tags,
      };
    }

    if (query?.userId) {
      where.userId = query.userId;
    }

    if (query?.typePost) {
      where.typePost = query.typePost;
    }

    if (query?.sortOption === SortOption.Likes) {
      orderBy.push({
        likes: {
          _count: query.sortDirection,
        },
      });
    } else if (query?.sortOption === SortOption.Comments) {
      orderBy.push({
        comments: {
          _count: query.sortDirection,
        },
      });
    } else if (query?.sortOption === SortOption.Date) {
      orderBy.push({
        updatedAt: query.sortDirection,
      });
    } else {
      orderBy.push({
        updatedAt: query.sortDirection,
      });
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          _count: {
            select: {
              comments: true,
              likes: true,
              reposts: true,
            },
          },
          likes: {
            where: {
              userId: currentUserId ?? '',
            },
            select: {
              id: true,
            },
          },
          reposts: {
            where: {
              userId: currentUserId ?? '',
            },
            select: {
              id: true,
            },
          },
        },
      }),
      this.getPostCount(where),
    ]);

    const entities = records.map((record) => {
      const { likes, reposts, ...postInfo } = record;
      const postEntity = this.createEntityFromDocument(
        postInfo as unknown as IPost
      );
      postEntity.comments = record._count?.comments;
      postEntity.likes = record._count?.likes;
      postEntity.reposts = record._count?.reposts;
      postEntity.isLike = likes.length > 0;
      postEntity.isRepost = reposts.length > 0;
      return postEntity;
    });

    return {
      entities,
      totalPages: this.calculatePostsPage(postCount, take),
      totalItems: postCount,
      currentPage: query?.page,
      itemsPerPage: take,
    };
  }
}
