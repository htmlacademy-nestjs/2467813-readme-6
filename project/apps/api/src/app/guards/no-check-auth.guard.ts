import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { ApplicationServiceURL, Path } from '@project/constant';

@Injectable()
export class NoCheckAuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const { data } = await this.httpService.axiosRef.post(
        `${ApplicationServiceURL.Users}/${Path.Check}`,
        {},
        {
          headers: {
            Authorization: request.headers['authorization'],
          },
        }
      );

      request['user'] = data;
    } catch (error) {
      request['user'] = { sub: '' };
    }
    return true;
  }
}
