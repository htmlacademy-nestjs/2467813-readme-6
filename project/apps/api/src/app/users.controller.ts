import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Req, UseFilters } from '@nestjs/common';

import { LoginUserDto } from '@project/authentication';

import { AppRoutes, ApplicationServiceURL, Path } from '@project/constant';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(AppRoutes.Users)
@Controller(AppRoutes.Users)
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @Post(Path.Login)
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/${Path.Login}`,
      loginUserDto
    );
    return data;
  }

  @Post(Path.Refresh)
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/${Path.Refresh}`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }
}
