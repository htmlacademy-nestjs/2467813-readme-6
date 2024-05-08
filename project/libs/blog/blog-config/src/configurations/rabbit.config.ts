import { registerAs } from '@nestjs/config';
import {
  DECIMAL_SYSTEM,
  DefaultPort,
  IRabbitConfig,
  SpaceName,
} from '@project/constant';
import * as Joi from 'joi';

const validationSchema = Joi.object({
  host: Joi.string().valid().hostname().required(),
  password: Joi.string().required(),
  port: Joi.number().port().default(DefaultPort.RabbitPort),
  user: Joi.string().required(),
  queue: Joi.string().required(),
  exchange: Joi.string().required(),
});

function validateConfig(config: IRabbitConfig): void {
  const { error } = validationSchema.validate(config, {
    abortEarly: true,
  });
  if (error) {
    throw new Error(`[Rabbit Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): IRabbitConfig {
  const config: IRabbitConfig = {
    host: process.env.RABBIT_HOST,
    password: process.env.RABBIT_PASSWORD,
    port: parseInt(
      process.env.RABBIT_PORT ?? DefaultPort.RabbitPort.toString(),
      DECIMAL_SYSTEM
    ),
    user: process.env.RABBIT_USER,
    queue: process.env.RABBIT_QUEUE,
    exchange: process.env.RABBIT_EXCHANGE,
  };

  validateConfig(config);
  return config;
}

export default registerAs(SpaceName.Rabbit, getConfig);
