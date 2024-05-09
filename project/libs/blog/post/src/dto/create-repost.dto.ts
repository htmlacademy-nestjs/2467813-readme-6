import { IsMongoId, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { LikeValidateMessage, OpenApiMessages } from '../const';

export class CreateRepostDto {
  @ApiProperty({
    description: OpenApiMessages.userId.description,
    example: OpenApiMessages.userId.example,
  })
  @IsString()
  @IsMongoId({ message: LikeValidateMessage.InvalidID })
  public userId: string;
}
