import { Types } from 'mongoose';
import { ExceptionMessage } from '@project/constant';
import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  public transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new HttpException(
        ExceptionMessage.PipeParam,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(ExceptionMessage.BadEntity);
    }

    return value;
  }
}
