import 'multer';
import { Express } from 'express';
import FormData from 'form-data';

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Patch,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
  Delete,
  HttpCode,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import {
  AppRoutes,
  ApplicationServiceURL,
  AuthToken,
  LimitSizeFile,
  Path,
  SortDirection,
  SortOption,
  TypePost,
} from '@project/constant';
import {
  CreatePostDto,
  OpenApiMessages,
  PostQuery,
  PostRdo,
  PostResponseMessage,
  PostWithPaginationRdo,
  UpdatePostDto,
} from '@project/post';
import { InjectUserIdInterceptor } from '@project/interceptors';
import {
  ApiHeader,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiOperation,
} from '@nestjs/swagger';
import { UserRdo } from '@project/authentication';
import { PostUserWithPaginationRdo } from './rdo/post-user-with-pagination.rdo';
import { NoCheckAuthGuard } from './guards/no-check-auth.guard';
import { PostUserRdo } from './rdo/post-user.rdo';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFileRdo } from '@project/file-uploader';

@ApiTags(AppRoutes.Blog)
@Controller(AppRoutes.Blog)
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly httpService: HttpService) {}

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
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiOperation({ summary: OpenApiMessages.path.create.summary })
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(
            new BadRequestException(
              'Only jpg, jpeg, and png files are allowed!'
            ),
            false
          );
        }
        cb(null, true);
      },
    })
  )
  @Post()
  public async create(
    @Body() dto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request
  ) {
    if (dto.typePost === TypePost.Photo && !file) {
      throw new BadRequestException('To publish a photo, you need a file');
    }

    if (file) {
      if (file.size > LimitSizeFile.Avatar) {
        throw new BadRequestException(
          'File is too large. Maximum size is 1MB.'
        );
      }

      const formData = new FormData();

      formData.append('file', file.buffer, file.originalname);

      const { data } = await this.httpService.axiosRef.post<UploadedFileRdo>(
        `${ApplicationServiceURL.File}/${Path.Upload}`,
        formData
      );

      dto.image = data.id;
    }

    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/`,
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
    type: PostUserWithPaginationRdo,
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
  @ApiHeader({
    name: AuthToken.Name,
    description: AuthToken.Description,
    required: false,
  })
  @UseGuards(NoCheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiOperation({ summary: OpenApiMessages.path.listPost.summary })
  @Get()
  public async index(@Query() query: PostQuery, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get<PostWithPaginationRdo>(
      `${ApplicationServiceURL.Blog}/`,
      {
        params: query,
        headers: {
          Authorization: req.headers['authorization'],
          'X-User-Id': req.headers['X-User-Id'],
        },
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
    type: PostUserRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostDetailSuccess,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.NotFound,
  })
  @ApiHeader({
    name: AuthToken.Name,
    description: AuthToken.Description,
    required: false,
  })
  @UseGuards(NoCheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiOperation({ summary: OpenApiMessages.path.DetailPost.summary })
  @Get(':id')
  public async show(@Param('id') id: string, @Req() req: Request) {
    const { data } = await this.httpService.axiosRef.get<PostRdo>(
      `${ApplicationServiceURL.Blog}/${id}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
          'X-User-Id': req.headers['X-User-Id'],
        },
      }
    );

    const { data: dataUser } = await this.httpService.axiosRef.get<UserRdo>(
      `${ApplicationServiceURL.Users}/${data.userId}`
    );

    return {
      ...data,
      user: dataUser,
    };
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
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiOperation({ summary: OpenApiMessages.path.UpdatePost.summary })
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Blog}/${id}`,
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
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiOperation({ summary: OpenApiMessages.path.DeletePost.summary })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public async delete(@Param('id') id: string, @Req() req: Request) {
    await this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Blog}/${id}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return {};
  }
}
