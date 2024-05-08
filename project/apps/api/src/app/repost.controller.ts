import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Put,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import {
  AppRoutes,
  ApplicationServiceURL,
  AuthToken,
  Path,
} from '@project/constant';
import { HttpService } from '@nestjs/axios';
import {
  CreateRepostDto,
  OpenApiMessages,
  PostResponseMessage,
  RepostRdo,
  RepostResponseMessage,
} from '@project/post';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/interceptors';

@ApiTags(AppRoutes.Reposts)
@Controller(AppRoutes.Reposts)
@UseFilters(AxiosExceptionFilter)
export class RepostController {
  constructor(private readonly httpService: HttpService) {}

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
  @ApiHeader({
    name: AuthToken.Name,
    description: AuthToken.Description,
    required: true,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiOperation({ summary: OpenApiMessages.path.createOrDeleteRepost.summary })
  @Put(`:postId`)
  public async createOrDelete(
    @Param('postId') postId: string,
    @Body() dto: CreateRepostDto,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.put(
      `${ApplicationServiceURL.Blog}/${postId}/${Path.Reposts}`,
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
