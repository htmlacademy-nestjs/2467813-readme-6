import { Controller, HttpStatus, Post, UseFilters } from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppRoutes, ApplicationServiceURL, Path } from '@project/constant';
import { NotificationResponseMessage, OpenApiMessages } from '@project/post';
import { HttpService } from '@nestjs/axios';

@ApiTags(AppRoutes.Notifications)
@Controller(AppRoutes.Notifications)
@UseFilters(AxiosExceptionFilter)
export class NotificationController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: NotificationResponseMessage.NotificationEmail,
  })
  @ApiOperation({ summary: OpenApiMessages.path.NotifyPosts.summary })
  @Post(Path.NewsletterPosts)
  public async sendNewsletter() {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/${Path.NewsletterPosts}`,
      null
    );

    return data;
  }
}
