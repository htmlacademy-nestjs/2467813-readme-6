/* eslint-disable no-prototype-builtins */
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { ExceptionMessage, PostTypeToKeys } from '@project/constant';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    const typeConfig = PostTypeToKeys[body.typePost];
    if (!typeConfig) {
      throw new BadRequestException(ExceptionMessage.FieldsInvalidMissing);
    }

    this.validatePostBody(
      body,
      typeConfig.requiredKeys,
      typeConfig.allowedKeys
    );

    return true;
  }

  private validatePostBody(
    body: CreatePostDto,
    requiredKeys: string[],
    allowedKeys: string[]
  ): void {
    for (const key of requiredKeys) {
      if (!body.hasOwnProperty(key)) {
        throw new BadRequestException(
          `${ExceptionMessage.FieldsMissing} ${key}`
        );
      }
    }

    const bodyKeys = Object.keys(body);
    for (const key of bodyKeys) {
      if (!allowedKeys.includes(key)) {
        throw new BadRequestException(
          `${ExceptionMessage.FieldsUnexpected} ${key}`
        );
      }
    }
  }
}
