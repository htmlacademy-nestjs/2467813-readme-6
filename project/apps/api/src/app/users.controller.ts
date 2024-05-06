import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Req } from '@nestjs/common';

import { LoginUserDto } from '@project/authentication';

import { AppRoutes, ApplicationServiceURL, Path } from '@project/constant';

@Controller(AppRoutes.Users)
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
