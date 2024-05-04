import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { OpenApiMessages } from '../const';

export class CommentRdo {
  @ApiProperty({
    description: OpenApiMessages.id.description,
    example: OpenApiMessages.id.example,
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: OpenApiMessages.userId.description,
    example: OpenApiMessages.userId.example,
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: OpenApiMessages.postId.description,
    example: OpenApiMessages.postId.example,
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: OpenApiMessages.createdAt.description,
    example: OpenApiMessages.createdAt.example,
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: OpenApiMessages.message.description,
    example: OpenApiMessages.message.example,
  })
  @Expose()
  public message: string;
}
