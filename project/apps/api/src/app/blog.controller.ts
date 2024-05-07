import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AppRoutes, ApplicationServiceURL, AuthToken } from '@project/constant';
import { CreatePostDto, PostRdo, PostResponseMessage } from '@project/post';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  @Post()
  public async create(@Body() dto: CreatePostDto, @Req() req: Request) {
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
}
