import * as Joi from 'joi';
import { registerAs } from '@nestjs/config';

import { SpaceName } from '@project/constant';
import { getMessageConfig } from '@project/helpers';
import { HttpException, HttpStatus } from '@nestjs/common';

export interface JWTConfig {
  accessTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenSecret: string;
  refreshTokenExpiresIn: string;
}

const validationSchema = Joi.object({
  accessTokenSecret: Joi.string().required(),
  accessTokenExpiresIn: Joi.string().required(),
  refreshTokenSecret: Joi.string().required(),
  refreshTokenExpiresIn: Joi.string().required(),
});

function validateConfig(config: JWTConfig): void {
  const { error } = validationSchema.validate(config, {
    abortEarly: true,
  });
  if (error) {
    throw new HttpException(
      getMessageConfig('Account JWT', error.message),
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

function getConfig(): JWTConfig {
  const config: JWTConfig = {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  };

  validateConfig(config);
  return config;
}

export default registerAs(SpaceName.Jwt, getConfig);
