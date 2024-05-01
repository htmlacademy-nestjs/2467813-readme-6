import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

import {
  DECIMAL_SYSTEM,
  DefaultPort,
  Environments,
  TEnvironment,
  SpaceName,
  IFileConfig,
} from '@project/constant';

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...Environments)
    .required(),
  port: Joi.number().port().default(DefaultPort.AppPortFile),
  uploadDirectory: Joi.string().required(),
  db: Joi.object({
    host: Joi.string().valid().hostname(),
    port: Joi.number().port(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  }),
});

function validateConfig(config: IFileConfig): void {
  const { error } = validationSchema.validate(config, {
    abortEarly: true,
  });
  if (error) {
    throw new Error(`[FileVault Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): IFileConfig {
  const config: IFileConfig = {
    environment: process.env.NODE_ENV as TEnvironment,
    port: parseInt(
      process.env.PORT || `${DefaultPort.AppPortFile}`,
      DECIMAL_SYSTEM
    ),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    db: {
      host: process.env.FILE_MONGO_HOST,
      port: parseInt(
        process.env.FILE_MONGO_PORT ?? DefaultPort.MongoPort.toString(),
        DECIMAL_SYSTEM
      ),
      name: process.env.FILE_MONGO_DB_NAME,
      user: process.env.FILE_MONGO_USER,
      password: process.env.FILE_MONGO_PASSWORD,
      authBase: process.env.FILE_MONGO_AUTH_BASE,
    },
  };
  validateConfig(config);
  return config;
}

export default registerAs(SpaceName.Application, getConfig);
