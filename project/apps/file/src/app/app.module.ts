import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileConfigModule, getMongooseOptions } from '@project/file-config';
import { FileUploaderModule } from '@project/file-uploader';

@Module({
  imports: [
    FileConfigModule,
    FileUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
