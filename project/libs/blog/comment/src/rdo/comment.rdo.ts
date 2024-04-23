import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'The uniq comment ID',
    example: '4e182f32-1497-4663-8e9b-7b06187c27cd',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'The uniq user ID',
    example: '6621683a9775bcf7c8f2606b',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'The uniq post ID',
    example: '4e182f32-1497-4663-8e9b-7b06187c27cd',
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'createdAt createdAt',
    example: '2024-04-23 10:04:27.508',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Comment message',
    example: 'message',
  })
  @Expose()
  public message: string;
}
