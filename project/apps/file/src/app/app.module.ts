import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SpaceName } from '@project/constant';
import { FileConfigModule } from '@project/file-config';
import { FileUploaderModule } from '@project/file-uploader';
import { getMongooseOptions } from '@project/helpers';

@Module({
  imports: [
    FileConfigModule,
    FileUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions(SpaceName.AppFile)),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
