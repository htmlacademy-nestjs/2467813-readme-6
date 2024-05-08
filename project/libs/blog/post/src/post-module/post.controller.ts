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
  Req,
  UseGuards,
} from '@nestjs/common';

import { fillDto } from '@project/helpers';

import { PostService } from './post.service';
import { PostQuery } from './post.query';

import { PostRdo } from '../rdo/post.rdo';
import { PostWithPaginationRdo } from '../rdo/post-with-pagination.rdo';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import {
  AppRoutes,
  AuthToken,
  Path,
  SortDirection,
  SortOption,
  TypePost,
} from '@project/constant';
import { ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  LikeResponseMessage,
  OpenApiMessages,
  PostResponseMessage,
  RepostResponseMessage,
} from '../const';
import { PostGuard } from '../guard/post.guard';
import { CreateLikeDto } from '../dto/create-like.dto';
import { LikeRdo } from '../rdo/like.rdo';
import { RepostRdo } from '../rdo/repost.rdo';
import { CreateRepostDto } from '../dto/create-repost.dto';

@ApiTags(AppRoutes.Posts)
@Controller(AppRoutes.Posts)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostDetailSuccess,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.NotFound,
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const post = await this.postService.getPost(id);
    return fillDto(PostRdo, post.toPOJO());
  }

  @ApiResponse({
    type: PostWithPaginationRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostListSuccess,
  })
  @ApiQuery({
    name: OpenApiMessages.tags.name,
    isArray: true,
    required: false,
  })
  @ApiQuery({
    name: OpenApiMessages.typePost.name,
    enum: TypePost,
    required: false,
  })
  @ApiQuery({
    name: OpenApiMessages.isPublished.name,
    type: 'boolean',
    required: false,
  })
  @ApiQuery({
    name: OpenApiMessages.sortOption.name,
    enum: SortOption,
    required: false,
  })
  @ApiQuery({
    name: OpenApiMessages.userId.name,
    type: 'string',
    required: false,
  })
  @ApiQuery({
    name: OpenApiMessages.sortDirection.name,
    enum: SortDirection,
    required: false,
  })
  @ApiQuery({
    name: OpenApiMessages.page.name,
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: OpenApiMessages.limit.name,
    type: 'number',
    required: false,
  })
  @Get()
  public async index(@Query() query: PostQuery, @Req() req: Request) {
    const userId = req.headers['x-user-id'] ?? '';

    const postsWithPagination = await this.postService.getAllPosts(
      query,
      userId
    );
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
  @UseGuards(PostGuard)
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.postService.createPost(dto);
    return fillDto(PostRdo, newPost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.NotFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: PostResponseMessage.IsNotLogged,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: PostResponseMessage.DeleteSuccess,
  })
  @ApiHeader({
    name: AuthToken.Name,
    description: AuthToken.Description,
    required: true,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('id') id: string) {
    await this.postService.deletePost(id);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: PostResponseMessage.UpdateSuccess,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.NotFound,
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
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.postService.updatePost(id, dto);
    return fillDto(PostRdo, updatedPost.toPOJO());
  }

  @ApiResponse({
    type: LikeRdo,
    status: HttpStatus.CREATED,
    description: LikeResponseMessage.LikeSuccess,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.NotFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: PostResponseMessage.IsNotLogged,
  })
  @Post(`/:id/${Path.Likes}`)
  public async isLike(@Param('id') id: string, @Body() dto: CreateLikeDto) {
    const isLike = await this.postService.createOrDeleteLike(id, dto);

    return fillDto(LikeRdo, {
      isLike,
      postId: id,
    });
  }

  @ApiResponse({
    type: RepostRdo,
    status: HttpStatus.CREATED,
    description: RepostResponseMessage.RepostSuccess,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.NotFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: PostResponseMessage.IsNotLogged,
  })
  @Post(`/:id/${Path.Reposts}`)
  public async isRepost(@Param('id') id: string, @Body() dto: CreateRepostDto) {
    const isRepost = await this.postService.createOrDeleteRepost(id, dto);

    return fillDto(RepostRdo, {
      isRepost,
      postId: id,
    });
  }

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.NotFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: PostResponseMessage.IsNotLogged,
  })
  @Get(`/:userId/${Path.Statistics}`)
  public async statistics(@Param('userId') userId: string) {
    const count = await this.postService.getStatistics(userId);

    return count;
  }
}
