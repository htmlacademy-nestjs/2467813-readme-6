import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { getMongoConnectionString } from './common';

export function getMongooseOptions(optionSpace): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>(`${optionSpace}.user`),
          password: config.get<string>(`${optionSpace}.password`),
          host: config.get<string>(`${optionSpace}.host`),
          port: config.get<string>(`${optionSpace}.port`),
          authDatabase: config.get<string>(`${optionSpace}.authBase`),
          databaseName: config.get<string>(`${optionSpace}.name`),
        }),
      };
    },
    inject: [ConfigService],
  };
}
