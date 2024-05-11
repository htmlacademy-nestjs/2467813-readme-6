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
import { getMessageConfig } from '@project/helpers';
import { HttpException, HttpStatus } from '@nestjs/common';

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
  mail: Joi.object({
    host: Joi.string().valid().hostname().required(),
    port: Joi.number().port().default(DefaultPort.MailSMTP),
    user: Joi.string().required(),
    password: Joi.string().required(),
    from: Joi.string().required(),
  }),
});

function validateConfig(config: INotifyConfig): void {
  const { error } = validationSchema.validate(config, {
    abortEarly: true,
  });
  if (error) {
    throw new HttpException(
      getMessageConfig('Notify', error.message),
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

function getConfig(): INotifyConfig {
  const config: INotifyConfig = {
    environment: process.env.NODE_ENV as TEnvironment,
    port: parseInt(
      process.env.PORT_NOTIFY || `${DefaultPort.AppPortNotify}`,
      DECIMAL_SYSTEM
    ),
    db: {
      host: process.env.NOTIFY_MONGO_HOST,
      port: parseInt(
        process.env.NOTIFY_MONGO_PORT ?? DefaultPort.MongoPort.toString(),
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
    mail: {
      host: process.env.MAIL_SMTP_HOST,
      port: parseInt(
        process.env.MAIL_SMTP_PORT ?? DefaultPort.MailSMTP.toString(),
        DECIMAL_SYSTEM
      ),
      user: process.env.MAIL_USER_NAME,
      password: process.env.MAIL_USER_PASSWORD,
      from: process.env.MAIL_FROM,
    },
  };

  validateConfig(config);
  return config;
}

export default registerAs(SpaceName.AppNotify, getConfig);
