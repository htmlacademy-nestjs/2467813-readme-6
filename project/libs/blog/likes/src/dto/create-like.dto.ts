import { IsBoolean, IsMongoId, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import {
  CreateLikeMessages,
  LikeValidateMessage,
  OpenApiMessages,
} from '../const';

export class CreateLikeDto {
  @ApiProperty({
    description: OpenApiMessages.isLike.description,
    example: OpenApiMessages.isLike.example,
  })
  @IsBoolean({ message: CreateLikeMessages.isLike.invalidFormat })
  public isLike: boolean;

  @ApiProperty({
    description: OpenApiMessages.userId.description,
    example: OpenApiMessages.userId.example,
  })
  @IsString()
  @IsMongoId({ message: LikeValidateMessage.InvalidID })
  public userId: string;
}
