import { Controller, Get, HttpStatus, UseFilters } from '@nestjs/common';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppRoutes, Path } from '@project/constant';
import { NotificationResponseMessage } from '@project/post';

@ApiTags(AppRoutes.Notifications)
@Controller(AppRoutes.Notifications)
@UseFilters(AxiosExceptionFilter)
export class NotificationController {
  @ApiResponse({
    status: HttpStatus.OK,
    description: NotificationResponseMessage.NotificationEmail,
  })
  @Get(Path.newsletterPosts)
  public async sendNewsletter() {
    return true;
  }
}
