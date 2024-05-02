import { IsBoolean, IsMongoId, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import {
  CreateRepostMessages,
  LikeValidateMessage,
  OpenApiMessages,
} from '../const';

export class CreateRepostDto {
  @ApiProperty({
    description: OpenApiMessages.isRepost.description,
    example: OpenApiMessages.isRepost.example,
  })
  @IsBoolean({ message: CreateRepostMessages.isRepost.invalidFormat })
  public isRepost: boolean;

  @ApiProperty({
    description: OpenApiMessages.userId.description,
    example: OpenApiMessages.userId.example,
  })
  @IsString()
  @IsMongoId({ message: LikeValidateMessage.InvalidID })
  public userId: string;
}
