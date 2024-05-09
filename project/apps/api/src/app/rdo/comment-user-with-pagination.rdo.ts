import { ApiProperty } from '@nestjs/swagger';
import { OpenApiMessages } from '@project/comment';
import { Expose } from 'class-transformer';
import { CommentUserRdo } from './comment-user.rdo';

export class CommentUserWithPaginationRdo {
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

  @ApiProperty({
    description: OpenApiMessages.entities.description,
    type: CommentUserRdo,
    isArray: true,
  })
  @Expose()
  public entities: CommentUserRdo[];
}
