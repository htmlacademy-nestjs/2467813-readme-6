import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { DECIMAL_SYSTEM, DefaultPort, SpaceName } from '@project/constant';

export interface IMongoConfig {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

const dbValidationSchema = Joi.object({
  host: Joi.string().hostname().required(),
  port: Joi.number().port().default(DefaultPort.MongoPort),
  name: Joi.string().required(),
  user: Joi.string().required(),
  password: Joi.string().required(),
  authBase: Joi.string().required(),
});

function validateMongoConfig(config: IMongoConfig): void {
  const { error } = dbValidationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[MongoDB Config Validation Error]: ${error.message}`);
  }
}

function getDbConfig(): IMongoConfig {
  const config: IMongoConfig = {
    host: process.env.DB_MONGO_HOST,
    name: process.env.DB_MONGO_NAME,
    port: parseInt(
      process.env.DB_MONGO_PORT ?? `${DefaultPort.MongoPort}`,
      DECIMAL_SYSTEM
    ),
    user: process.env.DB_MONGO_USER,
    password: process.env.DB_MONGO_PASSWORD,
    authBase: process.env.DB_MONGO_AUTH_BASE,
  };

  validateMongoConfig(config);
  return config;
}

export default registerAs(SpaceName.MongoDB, getDbConfig);
