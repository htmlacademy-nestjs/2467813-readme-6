import 'multer';
import { Express } from 'express';
import {
  BadRequestException,
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
import {
  AppRoutes,
  ExceptionMessage,
  LimitSizeFile,
  Path,
} from '@project/constant';
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
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (_req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(
            new BadRequestException(ExceptionMessage.FileBadRequest),
            false
          );
        }
        cb(null, true);
      },
    })
  )
  @Post(`/${Path.Upload}`)
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (file.size > LimitSizeFile.Avatar) {
      throw new BadRequestException(ExceptionMessage.FileSizeAvatar);
    }

    if (file.size > LimitSizeFile.Image) {
      throw new BadRequestException(ExceptionMessage.FileSizeImage);
    }

    const fileEntity = await this.fileUploaderService.saveFile(file);
    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
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
    return fillDto(UploadedFileRdo, existFile);
  }
}
