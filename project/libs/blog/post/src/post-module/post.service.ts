import { Injectable, NotFoundException } from '@nestjs/common';

import { IPaginationResult } from '@project/core';

import { PostRepository } from './post.repository';
import { PostEntity } from './post.entity';
import { PostQuery } from './post.query';
import { PostFactory } from './post.factory';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { getMessageNotFoundDocument } from '@project/helpers';
import { CreateLikeDto } from '../dto/create-like.dto';
import { LikeService } from '@project/likes';
import { CreateRepostDto } from '../dto/create-repost.dto';
import { RepostService } from '@project/repost';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly likeService: LikeService,
    private readonly repostService: RepostService
  ) {}

  public async getAllPosts(
    query?: PostQuery,
    currentUserId?: string
  ): Promise<IPaginationResult<PostEntity>> {
    return this.postRepository.find(query, currentUserId);
  }

  public async createPost(dto: CreatePostDto): Promise<PostEntity> {
    const newPost = PostFactory.createFromCreatePostDto(dto);
    await this.postRepository.save(newPost);

    return newPost;
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.postRepository.deleteById(id);
    } catch {
      throw new NotFoundException(getMessageNotFoundDocument('Post', id));
    }
  }

  public async getPost(id: string): Promise<PostEntity> {
    return this.postRepository.findById(id);
  }

  public async updatePost(id: string, dto: UpdatePostDto): Promise<PostEntity> {
    const existsPost = await this.postRepository.findById(id);
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return existsPost;
    }

    await this.postRepository.update(existsPost);

    return existsPost;
  }

  public async createOrDeleteLike(id: string, dto: CreateLikeDto) {
    const existsPost = await this.postRepository.findById(id);

    return await this.likeService.toggleLikes(dto.userId, existsPost.id);
  }

  public async createOrDeleteRepost(id: string, dto: CreateRepostDto) {
    const existsPost = await this.postRepository.findById(id);

    return await this.repostService.toggleRepost(dto.userId, existsPost.id);
  }

  public async getStatistics(id: string) {
    return await this.postRepository.getUserPostCount(id);
  }
}
