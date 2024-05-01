import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { getMongoConnectionString } from './common';

export function getMongooseOptions(optionSpace): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>(`${optionSpace}.db.user`),
          password: config.get<string>(`${optionSpace}.db.password`),
          host: config.get<string>(`${optionSpace}.db.host`),
          port: config.get<string>(`${optionSpace}.db.port`),
          authDatabase: config.get<string>(`${optionSpace}.db.authBase`),
          databaseName: config.get<string>(`${optionSpace}.db.name`),
        }),
      };
    },
    inject: [ConfigService],
  };
}
