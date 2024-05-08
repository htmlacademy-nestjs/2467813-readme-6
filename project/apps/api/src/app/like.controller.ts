import { Controller, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { AppRoutes } from '@project/constant';
import { HttpService } from '@nestjs/axios';

@ApiTags(AppRoutes.Likes)
@Controller(AppRoutes.Likes)
@UseFilters(AxiosExceptionFilter)
export class LikeController {
  constructor(private readonly httpService: HttpService) {}
}
