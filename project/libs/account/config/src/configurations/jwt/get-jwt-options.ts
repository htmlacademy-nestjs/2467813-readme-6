import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { Jwt, SpaceName } from '@project/constant';

export async function getJwtOptions(
  configService: ConfigService
): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>(`${SpaceName.Jwt}.accessTokenSecret`),
    signOptions: {
      expiresIn: configService.get<string>(
        `${SpaceName.Jwt}.accessTokenExpiresIn`
      ),
      algorithm: Jwt.algorithmHs256,
    },
  };
}
