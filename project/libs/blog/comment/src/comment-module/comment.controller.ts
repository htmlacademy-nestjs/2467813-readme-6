import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { CommentService } from './comment.service';
import { fillDto } from '@project/helpers';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentRdo } from '../rdo/comment.rdo';
import { AppRoutes, Path, AuthToken, SortDirection } from '@project/constant';
import { ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentResponseMessage, OpenApiMessages } from '../const';
import { CommentWithPaginationRdo } from '../rdo/comment-with-pagination.rdo';
import { CommentQuery } from './comment.query';

@ApiTags(AppRoutes.Comments)
@Controller(`${AppRoutes.Posts}/:postId/${Path.Comments}`)
export class CommentController {
  constructor(private readonly blogCommentService: CommentService) {}

  @ApiResponse({
    type: CommentWithPaginationRdo,
    status: HttpStatus.OK,
    description: CommentResponseMessage.CommentListSuccess,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentResponseMessage.NotFound,
  })
  @ApiQuery({
    name: OpenApiMessages.limit.name,
    type: 'number',
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
  @Get()
  public async show(
    @Param('postId') postId: string,
    @Query() query: CommentQuery
  ) {
    const commentsWithPagination = await this.blogCommentService.getAllComments(
      postId,
      query
    );

    const result = {
      ...commentsWithPagination,
      entities: commentsWithPagination.entities.map((comment) =>
        comment.toPOJO()
      ),
    };
    return fillDto(CommentWithPaginationRdo, result);
  }

  @ApiResponse({
    type: CreateCommentDto,
    status: HttpStatus.CREATED,
    description: CommentResponseMessage.CreatedSuccess,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentResponseMessage.NotFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: CommentResponseMessage.IsNotLogged,
  })
  @ApiHeader({
    name: AuthToken.Name,
    description: AuthToken.Description,
    required: true,
  })
  @Post()
  public async create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto
  ) {
    const newComment = await this.blogCommentService.createComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentResponseMessage.NotFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: CommentResponseMessage.IsNotLogged,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: CommentResponseMessage.DeleteSuccess,
  })
  @ApiHeader({
    name: AuthToken.Name,
    description: AuthToken.Description,
    required: true,
  })
  @Delete(':commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async destroy(@Param('commentId') id: string) {
    await this.blogCommentService.deleteComment(id);
  }
}
