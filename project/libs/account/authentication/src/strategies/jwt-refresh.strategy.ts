import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';

import { ITokenPayload } from '@project/core';

import { AuthenticationService } from '../authentication-module/authentication.service';
import { jwtConfig } from '@project/config';
import { SpaceName } from '@project/constant';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  SpaceName.JwtRefresh
) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthenticationService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: ITokenPayload) {
    return this.authService.getUserByEmail(payload.email);
  }
}
