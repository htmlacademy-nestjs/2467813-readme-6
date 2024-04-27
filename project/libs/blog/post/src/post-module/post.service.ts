import { Injectable, NotFoundException } from '@nestjs/common';

import { IPaginationResult } from '@project/core';

import { PostRepository } from './post.repository';
import { PostEntity } from './post.entity';
import { PostQuery } from './post.query';
import { PostFactory } from './post.factory';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { getMessageNotFoundDocument } from '@project/helpers';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  public async getAllPosts(
    query?: PostQuery
  ): Promise<IPaginationResult<PostEntity>> {
    return this.postRepository.find(query);
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
}
