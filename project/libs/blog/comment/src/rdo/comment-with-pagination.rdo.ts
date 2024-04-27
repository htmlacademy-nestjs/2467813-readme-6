import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CommentRdo } from './comment.rdo';

export class CommentWithPaginationRdo {
  @ApiProperty({
    description: 'Comment list entities',
    type: CommentRdo,
    isArray: true,
  })
  @Expose()
  public entities: CommentRdo[];

  @ApiProperty({
    description: 'Comment list totalPages',
    example: 1,
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'Comment list totalItems',
    example: 1,
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: 'Comment list currentPage',
    example: 1,
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: 'Comment list itemsPerPage',
    example: 1,
  })
  @Expose()
  public itemsPerPage: number;
}
