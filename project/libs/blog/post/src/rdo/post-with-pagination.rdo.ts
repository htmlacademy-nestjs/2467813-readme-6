import { Expose } from 'class-transformer';
import { PostRdo } from './post.rdo';
import { ApiProperty } from '@nestjs/swagger';
import { OpenApiMessages } from '../const';

export class PostWithPaginationRdo {
  @ApiProperty({
    description: OpenApiMessages.totalPages.description,
    example: OpenApiMessages.totalPages.example,
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: OpenApiMessages.totalItems.description,
    example: OpenApiMessages.totalItems.example,
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: OpenApiMessages.currentPage.description,
    example: OpenApiMessages.currentPage.example,
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: OpenApiMessages.currentPage.description,
    example: OpenApiMessages.itemsPerPage.example,
  })
  @Expose()
  public itemsPerPage: number;

  @ApiProperty({
    description: OpenApiMessages.entities.description,
    type: PostRdo,
    isArray: true,
  })
  @Expose()
  public entities: PostRdo[];
}
