import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaClientService } from '@project/models';
import { IComment, IPaginationResult } from '@project/core';

import { CommentEntity } from './comment.entity';
import { CommentFactory } from './comment.factory';
import { BasePostgresRepository } from '@project/data-access';
import { CommentQuery } from './comment.query';
import { Prisma } from '@prisma/client';
import { getMessageNotFoundDocument } from '@project/helpers';

@Injectable()
export class CommentRepository extends BasePostgresRepository<
  CommentEntity,
  IComment
> {
  constructor(
    entityFactory: CommentFactory,
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

  public async save(entity: CommentEntity): Promise<void> {
    const record = await this.client.comment.create({
      data: {
        ...entity.toPOJO(),
      },
    });

    entity.id = record.id;
  }

  public async findById(id: string): Promise<CommentEntity> {
    const document = await this.client.comment.findFirst({
      where: {
        id,
      },
    });

    if (!document) {
      throw new NotFoundException(getMessageNotFoundDocument('Comment', id));
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
    query?: CommentQuery
  ): Promise<IPaginationResult<CommentEntity>> {
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
