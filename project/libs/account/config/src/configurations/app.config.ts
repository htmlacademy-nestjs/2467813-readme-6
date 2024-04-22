import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import {
  DECIMAL_SYSTEM,
  DefaultPort,
  Environments,
  TEnvironment,
  SpaceName,
} from '@project/constant';

export interface IApplicationConfig {
  environment: string;
  port: number;
}

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...Environments)
    .required(),
  port: Joi.number().port().default(DefaultPort.AppPort),
});

function validateConfig(config: IApplicationConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Application Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): IApplicationConfig {
  const config: IApplicationConfig = {
    environment: process.env.NODE_ENV as TEnvironment,
    port: parseInt(
      process.env.PORT || `${DefaultPort.AppPort}`,
      DECIMAL_SYSTEM
    ),
  };

  validateConfig(config);
  return config;
}

export default registerAs(SpaceName.Application, getConfig);
