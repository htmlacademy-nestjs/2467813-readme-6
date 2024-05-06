import {
  Body,
  Controller,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { AppRoutes, ApplicationServiceURL } from '@project/constant';
import { CreatePostDto } from '@project/post';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(AppRoutes.Blog)
@Controller(AppRoutes.Blog)
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/`,
      dto
    );

    return data;
  }
}
