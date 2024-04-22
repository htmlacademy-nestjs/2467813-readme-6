import { Injectable } from '@nestjs/common';

import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { PostService } from '@project/post';
import { BlogCommentFactory } from './blog-comment.factory';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly postService: PostService,
    private readonly blogCommentFactory: BlogCommentFactory
  ) {}

  public async getComments(postId: string): Promise<BlogCommentEntity[]> {
    return this.blogCommentRepository.findByPostId(postId);
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
}
