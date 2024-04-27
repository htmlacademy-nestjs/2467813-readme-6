/* eslint-disable no-prototype-builtins */
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { PostTypeToKeys } from '@project/constant';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    const typeConfig = PostTypeToKeys[body.typePost];
    if (!typeConfig) {
      throw new BadRequestException(
        'Invalid post type or missing required fields'
      );
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
    // Проверяем наличие всех необходимых ключей
    for (const key of requiredKeys) {
      if (!body.hasOwnProperty(key)) {
        throw new BadRequestException(`Missing field: ${key}`);
      }
    }

    // Проверяем, что нет лишних ключей
    const bodyKeys = Object.keys(body);
    for (const key of bodyKeys) {
      if (!allowedKeys.includes(key)) {
        throw new BadRequestException(`Unexpected field: ${key}`);
      }
    }
  }
}
