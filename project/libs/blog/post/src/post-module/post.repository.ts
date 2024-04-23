/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { IPaginationResult, IPost } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/models';

import { PostEntity } from './post.entity';
import { PostFactory } from './post.factory';
import { PostQuery } from './post.query';

@Injectable()
export class PostRepository extends BasePostgresRepository<PostEntity, IPost> {
  constructor(
    entityFactory: PostFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
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

  public async findById(id: string): Promise<PostEntity> {
    const document = await this.client.post.findFirst({
      where: {
        id,
      },
      // include: {
      //   categories: true,
      //   comments: true,
      // },
    });

    if (!document) {
      throw new NotFoundException(`Post with id ${id} not found.`);
    }

    // @ts-ignore
    return this.createEntityFromDocument(document);
  }

  public async update(entity: PostEntity): Promise<void> {
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
      },
      // include: {
      //   categories: true,
      //   comments: true,
      // },
    });
  }

  public async find(query?: PostQuery): Promise<IPaginationResult<PostEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.PostWhereInput = {};
    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    // if (query?.categories) {
    // where.categories = {
    //   some: {
    //     id: {
    //       in: query.categories,
    //     },
    //   },
    // };
    // }

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    const [records, postCount] = await Promise.all([
      this.client.post.findMany({
        where,
        orderBy,
        skip,
        take,
        // include: {
        //   categories: true,
        //   comments: true,
        // },
      }),
      this.getPostCount(where),
    ]);

    return {
      // @ts-ignore
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page,
      totalPages: this.calculatePostsPage(postCount, take),
      itemsPerPage: take,
      totalItems: postCount,
    };
  }
}
