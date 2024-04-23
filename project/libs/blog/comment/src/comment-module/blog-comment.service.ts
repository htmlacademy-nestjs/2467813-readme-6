import { Injectable, NotFoundException } from '@nestjs/common';

import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { PostService } from '@project/post';
import { BlogCommentFactory } from './blog-comment.factory';
import { BlogCommentQuery } from './blog-comment.query';
import { IPaginationResult } from '@project/core';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly postService: PostService,
    private readonly blogCommentFactory: BlogCommentFactory
  ) {}

  public async getAllComments(
    postId: string,
    query?: BlogCommentQuery
  ): Promise<IPaginationResult<BlogCommentEntity>> {
    return this.blogCommentRepository.findByPostId(postId, query);
  }

  public async createComment(
    postId: string,
    dto: CreateCommentDto
  ): Promise<BlogCommentEntity> {
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
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}
