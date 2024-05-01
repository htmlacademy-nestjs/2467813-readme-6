import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

import {
  DECIMAL_SYSTEM,
  DefaultPort,
  Environments,
  TEnvironment,
  SpaceName,
  INotifyConfig,
} from '@project/constant';

const validationSchema = Joi.object({
  environment: Joi.string()
    .valid(...Environments)
    .required(),
  port: Joi.number().port().default(DefaultPort.AppPortNotify),
  db: Joi.object({
    host: Joi.string().valid().hostname(),
    port: Joi.number().port(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  }),
  rabbit: Joi.object({
    host: Joi.string().valid().hostname().required(),
    password: Joi.string().required(),
    port: Joi.number().port().default(DefaultPort.RabbitPort),
    user: Joi.string().required(),
    queue: Joi.string().required(),
    exchange: Joi.string().required(),
  }),
});

function validateConfig(config: INotifyConfig): void {
  const { error } = validationSchema.validate(config, {
    abortEarly: true,
  });
  if (error) {
    throw new Error(`[Notify Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): INotifyConfig {
  const config: INotifyConfig = {
    environment: process.env.NODE_ENV as TEnvironment,
    port: parseInt(
      process.env.PORT || `${DefaultPort.AppPortNotify}`,
      DECIMAL_SYSTEM
    ),
    db: {
      host: process.env.NOTIFY_MONGO_HOST,
      port: parseInt(
        process.env.MONGO_EXTERNAL_PORT ?? DefaultPort.MongoPort.toString(),
        DECIMAL_SYSTEM
      ),
      name: process.env.NOTIFY_MONGO_DB_NAME,
      user: process.env.NOTIFY_MONGO_USER,
      password: process.env.NOTIFY_MONGO_PASSWORD,
      authBase: process.env.NOTIFY_MONGO_AUTH_BASE,
    },
    rabbit: {
      host: process.env.RABBIT_HOST,
      password: process.env.RABBIT_PASSWORD,
      port: parseInt(
        process.env.RABBIT_PORT ?? DefaultPort.RabbitPort.toString(),
        DECIMAL_SYSTEM
      ),
      user: process.env.RABBIT_USER,
      queue: process.env.RABBIT_QUEUE,
      exchange: process.env.RABBIT_EXCHANGE,
    },
  };
  console.log(config);
  validateConfig(config);
  return config;
}

export default registerAs(SpaceName.Application, getConfig);
