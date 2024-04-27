import { Expose } from 'class-transformer';
import { PostRdo } from './post.rdo';
import { ApiProperty } from '@nestjs/swagger';

export class PostWithPaginationRdo {
  @ApiProperty({
    description: 'Post list entities',
    type: PostRdo,
    isArray: true,
  })
  @Expose()
  public entities: PostRdo[];

  @ApiProperty({
    description: 'Post list totalPages',
    example: 1,
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'Post list totalItems',
    example: 1,
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: 'Post list currentPage',
    example: 1,
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: 'Post list itemsPerPage',
    example: 1,
  })
  @Expose()
  public itemsPerPage: number;
}
