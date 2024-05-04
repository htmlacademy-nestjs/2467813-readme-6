import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { CommentRdo } from './comment.rdo';
import { OpenApiMessages } from '../const';

export class CommentWithPaginationRdo {
  @ApiProperty({
    description: OpenApiMessages.entities.description,
    type: CommentRdo,
    isArray: true,
  })
  @Expose()
  public entities: CommentRdo[];

  @ApiProperty({
    description: OpenApiMessages.totalPages.description,
    example: OpenApiMessages.totalPages.example,
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: OpenApiMessages.currentPage.description,
    example: OpenApiMessages.currentPage.example,
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
    description: OpenApiMessages.itemsPerPage.description,
    example: OpenApiMessages.itemsPerPage.example,
  })
  @Expose()
  public itemsPerPage: number;
}
