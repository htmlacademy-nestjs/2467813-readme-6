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

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...Environments)
    .required(),
  port: Joi.number().port().default(DefaultPort.AppPortUser),
});

function validateConfig(config: IAppConfig): void {
  const { error } = validationSchema.validate(config, {
    abortEarly: true,
  });
  if (error) {
    throw new Error(`[Application Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): IAppConfig {
  const config: IAppConfig = {
    environment: process.env.NODE_ENV as TEnvironment,
    port: parseInt(
      process.env.PORT_USER || `${DefaultPort.AppPortUser}`,
      DECIMAL_SYSTEM
    ),
  };

  validateConfig(config);
  return config;
}

export default registerAs(SpaceName.AppUser, getConfig);
