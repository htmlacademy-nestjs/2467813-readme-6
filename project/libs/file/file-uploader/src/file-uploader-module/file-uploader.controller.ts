import 'multer';
import { Express } from 'express';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FileUploaderService } from './file-uploader.service';
import { AppRoutes, Path } from '@project/constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillDto } from '@project/helpers';
import { UploadedFileRdo } from '../rdo/uploaded-file.rdo';
import { MongoIdValidationPipe } from '@project/pipes';
import { UploadResponseMessage } from '../const';

@ApiTags(AppRoutes.Files)
@Controller(AppRoutes.Files)
export class FileUploaderController {
  constructor(private readonly fileUploaderService: FileUploaderService) {}

  @ApiResponse({
    type: UploadedFileRdo,
    status: HttpStatus.CREATED,
    description: UploadResponseMessage.UploadSuccess,
  })
  @Post(`/${Path.Upload}`)
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileEntity = await this.fileUploaderService.saveFile(file);
    return fillDto(UploadedFileRdo, fileEntity.toPOJO() as any);
  }

  @ApiResponse({
    type: UploadedFileRdo,
    status: HttpStatus.OK,
    description: UploadResponseMessage.FileFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: UploadResponseMessage.FileNotFound,
  })
  @Get('/:fileId')
  public async show(@Param('fileId', MongoIdValidationPipe) fileId: string) {
    const existFile = await this.fileUploaderService.getFile(fileId);
    return fillDto(UploadedFileRdo, existFile as any);
  }
}
