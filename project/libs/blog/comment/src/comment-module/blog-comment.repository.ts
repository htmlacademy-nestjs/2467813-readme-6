import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@project/models';
import { IComment, IPaginationResult } from '@project/core';

import { BlogCommentEntity } from './blog-comment.entity';
import { BlogCommentFactory } from './blog-comment.factory';
import { BasePostgresRepository } from '@project/data-access';
import { BlogCommentQuery } from './blog-comment.query';
import { Prisma } from '@prisma/client';

@Injectable()
export class BlogCommentRepository extends BasePostgresRepository<
  BlogCommentEntity,
  IComment
> {
  constructor(
    entityFactory: BlogCommentFactory,
    readonly client: PrismaClientService
  ) {
    super(entityFactory, client);
  }

  public async findByPostIdCount(postId: string): Promise<number> {
    const records = await this.client.comment.count({
      where: {
        postId,
      },
    });

    return records;
  }

  private calculateCommentPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async save(entity: BlogCommentEntity): Promise<void> {
    const record = await this.client.comment.create({
      data: {
        ...entity.toPOJO(),
      },
    });

    entity.id = record.id;
  }

  public async findById(id: string): Promise<BlogCommentEntity> {
    const document = await this.client.comment.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(document);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.comment.delete({
      where: {
        id,
      },
    });
  }

  public async findByPostId(
    postId: string,
    query?: BlogCommentQuery
  ): Promise<IPaginationResult<BlogCommentEntity>> {
    const skip =
      query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit;
    const where: Prisma.CommentWhereInput = {};
    const orderBy: Prisma.CommentOrderByWithRelationInput = {};

    if (query?.sortDirection) {
      orderBy.createdAt = query.sortDirection;
    }

    const [records, commentCount] = await Promise.all([
      this.client.comment.findMany({
        where,
        orderBy,
        skip,
        take,
        // include: {
        //   categories: true,
        //   comments: true,
        // },
      }),
      this.findByPostIdCount(postId),
    ]);

    return {
      entities: records.map((record) =>
        this.createEntityFromDocument(record as IComment)
      ),
      totalPages: this.calculateCommentPage(commentCount, take),
      totalItems: commentCount,
      currentPage: query?.page,
      itemsPerPage: take,
    };
  }
}
