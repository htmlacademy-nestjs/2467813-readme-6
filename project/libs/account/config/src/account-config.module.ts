import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from './configurations/app.config';
import mongoConfig from './configurations/mongo.config';
import jwtConfig from './configurations/jwt.config';
import { PathEnvironments } from '@project/constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, mongoConfig, jwtConfig],
      envFilePath: PathEnvironments.User,
    }),
  ],
})
export class AccountConfigModule {}
