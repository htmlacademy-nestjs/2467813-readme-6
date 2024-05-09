import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
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
  PostRdo,
  PostResponseMessage,
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
    type: PostRdo,
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
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: PostResponseMessage.IsYourRepost,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: PostResponseMessage.IsRepostExists,
  })
  @ApiHeader({
    name: AuthToken.Name,
    description: AuthToken.Description,
    required: true,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiOperation({ summary: OpenApiMessages.path.createRepost.summary })
  @Post(`:postId`)
  public async createRepost(
    @Param('postId') postId: string,
    @Body() dto: CreateRepostDto,
    @Req() req: Request
  ) {
    const { data } = await this.httpService.axiosRef.post(
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
