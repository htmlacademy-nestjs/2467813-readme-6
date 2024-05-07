import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostUserRdo } from './post-user.rdo';
import { OpenApiMessages } from '@project/post';

export class PostUserWithPaginationRdo {
  @ApiProperty({
    description: OpenApiMessages.entities.description,
    type: PostUserRdo,
    isArray: true,
  })
  @Expose()
  public entities: PostUserRdo[];

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
}
