import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { OpenApiMessages } from '../const';

export class LikeRdo {
  @ApiProperty({
    description: OpenApiMessages.isLike.description,
    example: OpenApiMessages.isLike.example,
  })
  @Expose()
  public isLike: boolean;

  @ApiProperty({
    description: OpenApiMessages.postId.description,
    example: OpenApiMessages.postId.example,
  })
  @Expose()
  public postId: string;
}
