import { getMongoConnectionString } from '@project/helpers';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>('mongo_db.user'),
          password: config.get<string>('mongo_db.password'),
          host: config.get<string>('mongo_db.host'),
          port: config.get<string>('mongo_db.port'),
          databaseName: config.get<string>('mongo_db.name'),
          authDatabase: config.get<string>('mongo_db.authBase'),
        }),
      };
    },
    inject: [ConfigService],
  };
}
