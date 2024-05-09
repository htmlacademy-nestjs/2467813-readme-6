import { Expose } from 'class-transformer';
import { TTypePost, TypePost } from '@project/constant';
import { ApiProperty } from '@nestjs/swagger';
import { OpenApiMessages } from '@project/post';
import { UserRdo } from '@project/authentication';

export class PostUserRdo {
  @ApiProperty({
    type: UserRdo,
  })
  public user?: UserRdo;

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
    enum: TypePost,
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
    description: OpenApiMessages.image.description,
    example: OpenApiMessages.image.example,
  })
  @Expose()
  public image?: string;

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

  @ApiProperty({
    description: OpenApiMessages.isRepost.description,
    example: OpenApiMessages.isRepost.example,
  })
  @Expose()
  public isRepost?: boolean;

  @ApiProperty({
    description: OpenApiMessages.isLike.description,
    example: OpenApiMessages.isLike.example,
  })
  @Expose()
  public isLike?: boolean;

  @ApiProperty({
    description: OpenApiMessages.likes.description,
    example: OpenApiMessages.likes.example,
  })
  @Expose()
  public likes: number;

  @ApiProperty({
    description: OpenApiMessages.comments.description,
    example: OpenApiMessages.comments.example,
  })
  @Expose()
  public comments: number;

  @ApiProperty({
    description: OpenApiMessages.reposts.description,
    example: OpenApiMessages.reposts.example,
  })
  @Expose()
  public reposts: number;

  @ApiProperty({
    description: OpenApiMessages.tags.description,
    example: OpenApiMessages.tags.example,
  })
  @Expose()
  public tags?: string[];
}
