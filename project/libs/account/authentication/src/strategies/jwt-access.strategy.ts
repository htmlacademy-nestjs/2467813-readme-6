import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ITokenPayload } from '@project/core';
import { SpaceName } from '@project/constant';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(
        `${SpaceName.Jwt}.accessTokenSecret`
      ),
    });
  }

  public async validate(payload: ITokenPayload) {
    return payload;
  }
}
