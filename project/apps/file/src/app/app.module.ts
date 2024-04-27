import { Module } from '@nestjs/common';
import { FileConfigModule } from '@project/file-config';
import { FileUploaderModule } from '@project/file-uploader';

@Module({
  imports: [FileConfigModule, FileUploaderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
