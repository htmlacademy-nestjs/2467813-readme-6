import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

import {
  DECIMAL_SYSTEM,
  DefaultPort,
  Environments,
  TEnvironment,
  SpaceName,
  IAppConfig,
} from '@project/constant';
import { getMessageConfig } from '@project/helpers';
import { HttpException, HttpStatus } from '@nestjs/common';

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...Environments)
    .required(),
  port: Joi.number().port().default(DefaultPort.AppPortBlog),
});

function validateConfig(config: IAppConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new HttpException(
      getMessageConfig('Application', error.message),
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

function getConfig(): IAppConfig {
  const config: IAppConfig = {
    environment: process.env.NODE_ENV as TEnvironment,
    port: parseInt(
      process.env.PORT_BLOG || `${DefaultPort.AppPortBlog}`,
      DECIMAL_SYSTEM
    ),
  };

  validateConfig(config);
  return config;
}

export default registerAs(SpaceName.AppBlog, getConfig);
