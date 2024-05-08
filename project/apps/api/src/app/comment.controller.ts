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
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AppRoutes,
  ApplicationServiceURL,
  AuthToken,
  Path,
  SortDirection,
} from '@project/constant';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { HttpService } from '@nestjs/axios';
import {
  CommentQuery,
  CommentResponseMessage,
  CommentWithPaginationRdo,
  CreateCommentDto,
  OpenApiMessages,
} from '@project/comment';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { UserRdo } from '@project/authentication';
import { CommentUserWithPaginationRdo } from './rdo/comment-user-with-pagination.rdo';

@ApiTags(AppRoutes.Comments)
@Controller(AppRoutes.Comments)
@UseFilters(AxiosExceptionFilter)
export class CommentController {
  constructor(private readonly httpService: HttpService) {}

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
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiOperation({ summary: OpenApiMessages.path.create.summary })
  @Post(':postId')
  public async create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/${postId}/${Path.Comments}`,
      dto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }

  @ApiResponse({
    type: CommentUserWithPaginationRdo,
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
  @ApiOperation({ summary: OpenApiMessages.path.listComments.summary })
  @Get(':postId')
  public async index(
    @Param('postId') postId: string,
    @Query() query: CommentQuery
  ) {
    const { data } =
      await this.httpService.axiosRef.get<CommentWithPaginationRdo>(
        `${ApplicationServiceURL.Blog}/${postId}/${Path.Comments}`,
        {
          params: query,
        }
      );

    const result = await Promise.all(
      data.entities.map(async (item) => {
        const { data } = await this.httpService.axiosRef.get<UserRdo>(
          `${ApplicationServiceURL.Users}/${item.userId}`
        );
        return {
          ...item,
          user: data,
        };
      })
    );

    return {
      ...data,
      entities: result,
    };
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
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiOperation({ summary: OpenApiMessages.path.DeleteComment.summary })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(`:postId/${Path.Comments}/:id`)
  public async delete(
    @Param('postId') postId: string,
    @Param('id') id: string,
    @Req() req: Request
  ) {
    await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Blog}/${postId}/${Path.Comments}/${id}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return {};
  }
}
