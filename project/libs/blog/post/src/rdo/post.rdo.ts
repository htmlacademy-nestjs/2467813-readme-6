import { Expose } from 'class-transformer';
import { TTypePost } from '@project/constant';
import { ApiProperty } from '@nestjs/swagger';
import { OpenApiMessages } from '../const';

export class PostRdo {
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
    description: OpenApiMessages.typePost.description,
    example: OpenApiMessages.typePost.example,
  })
  @Expose()
  public typePost: TTypePost;

  @ApiProperty({
    description: OpenApiMessages.createdAt.description,
    example: OpenApiMessages.createdAt.example,
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: OpenApiMessages.updatedAt.description,
    example: OpenApiMessages.updatedAt.example,
  })
  @Expose()
  public updatedAt: string;

  @ApiProperty({
    description: OpenApiMessages.title.description,
    example: OpenApiMessages.title.example,
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: OpenApiMessages.announcementPublic.description,
    example: OpenApiMessages.announcementPublic.example,
  })
  @Expose()
  public announcementPublic?: string;

  @ApiProperty({
    description: OpenApiMessages.textPublic.description,
    example: OpenApiMessages.textPublic.example,
  })
  @Expose()
  public textPublic?: string;

  @ApiProperty({
    description: OpenApiMessages.videoUrl.description,
    example: OpenApiMessages.videoUrl.example,
  })
  @Expose()
  public videoUrl?: string;

  @ApiProperty({
    description: OpenApiMessages.imageUrl.description,
    example: OpenApiMessages.imageUrl.example,
  })
  @Expose()
  public imageUrl?: string;

  @ApiProperty({
    description: OpenApiMessages.textQuote.description,
    example: OpenApiMessages.textQuote.example,
  })
  @Expose()
  public textQuote?: string;

  @ApiProperty({
    description: OpenApiMessages.quoteAuthor.description,
    example: OpenApiMessages.quoteAuthor.example,
  })
  @Expose()
  public quoteAuthor?: string;

  @ApiProperty({
    description: OpenApiMessages.link.description,
    example: OpenApiMessages.link.example,
  })
  @Expose()
  public link?: string;

  @ApiProperty({
    description: OpenApiMessages.linkDescription.description,
    example: OpenApiMessages.linkDescription.example,
  })
  @Expose()
  public linkDescription?: string;

  @ApiProperty({
    description: OpenApiMessages.isPublished.description,
    example: OpenApiMessages.isPublished.example,
  })
  @Expose()
  public isPublished: boolean;

  @Expose()
  public isRepost?: boolean;

  @Expose()
  public originalPostId?: string;

  @Expose()
  public likes: number;

  @ApiProperty({
    description: OpenApiMessages.comments.description,
    example: OpenApiMessages.comments.example,
  })
  @Expose()
  public comments: number;

  @Expose()
  public reposts: number;

  @ApiProperty({
    description: OpenApiMessages.tags.description,
    example: OpenApiMessages.tags.description,
  })
  @Expose()
  public tags?: string[];
}
