import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { OpenApiMessages } from '../const';

export class RepostRdo {
  @ApiProperty({
    description: OpenApiMessages.isRepost.description,
    example: OpenApiMessages.isRepost.example,
  })
  @Expose()
  public isRepost: boolean;

  @ApiProperty({
    description: OpenApiMessages.postId.description,
    example: OpenApiMessages.postId.example,
  })
  @Expose()
  public postId: string;
}
