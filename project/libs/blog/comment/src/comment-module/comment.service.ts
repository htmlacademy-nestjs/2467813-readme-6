import { Injectable, NotFoundException } from '@nestjs/common';

import { CommentRepository } from './comment.repository';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { PostService } from '@project/post';
import { CommentFactory } from './comment.factory';
import { CommentQuery } from './comment.query';
import { IPaginationResult } from '@project/core';
import { getMessageNotFoundDocument } from '@project/helpers';

@Injectable()
export class CommentService {
  constructor(
    private readonly blogCommentRepository: CommentRepository,
    private readonly postService: PostService,
    private readonly blogCommentFactory: CommentFactory
  ) {}

  public async getAllComments(
    postId: string,
    query?: CommentQuery
  ): Promise<IPaginationResult<CommentEntity>> {
    return this.blogCommentRepository.findByPostId(postId, query);
  }

  public async createComment(
    postId: string,
    dto: CreateCommentDto
  ): Promise<CommentEntity> {
    const existsPost = await this.postService.getPost(postId);
    const newComment = this.blogCommentFactory.createFromDto(
      dto,
      existsPost.id
    );

    await this.blogCommentRepository.save(newComment);

    return newComment;
  }

  public async deleteComment(id: string): Promise<void> {
    try {
      await this.blogCommentRepository.deleteById(id);
    } catch {
      throw new NotFoundException(getMessageNotFoundDocument('Comment', id));
    }
  }
}
