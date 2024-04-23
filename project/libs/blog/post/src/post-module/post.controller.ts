import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { fillDto } from '@project/helpers';

import { PostService } from './post.service';
import { PostQuery } from './post.query';

import { PostRdo } from '../rdo/post.rdo';
import { PostWithPaginationRdo } from '../rdo/post-with-pagination.rdo';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { AppRoutes, AuthToken } from '@project/constant';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostResponseMessage } from '../const';

@ApiTags(AppRoutes.Posts)
@Controller(AppRoutes.Posts)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  public async show(@Param('id') id: string) {
    const post = await this.postService.getPost(id);
    return fillDto(PostRdo, post.toPOJO());
  }

  @Get()
  public async index(@Query() query: PostQuery) {
    const postsWithPagination = await this.postService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO()),
    };
    return fillDto(PostWithPaginationRdo, result);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: PostResponseMessage.CreatedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: PostResponseMessage.IsNotLogged,
  })
  @ApiHeader({
    name: AuthToken.Name,
    description: AuthToken.Description,
    required: true,
  })
  @Post()
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.postService.createPost(dto);
    // console.log('PostController', newPost);
    return fillDto(PostRdo, newPost.toPOJO());
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.postService.deletePost(id);
  }

  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.postService.updatePost(id, dto);
    return fillDto(PostRdo, updatedPost.toPOJO());
  }
}
