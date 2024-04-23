import { Expose } from 'class-transformer';
import { TTypePost } from '@project/constant';
import { ApiProperty } from '@nestjs/swagger';

export class PostRdo {
  @ApiProperty({
    description: 'The uniq post ID',
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
    description: 'Post typePost',
    example: 'text',
  })
  @Expose()
  public typePost: TTypePost;

  @ApiProperty({
    description: 'Post createdAt',
    example: '2024-04-23 10:04:27.508',
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Post updatedAt',
    example: '2024-04-23 10:04:27.508',
  })
  @Expose()
  public updatedAt: string;

  @ApiProperty({
    description: 'Post title',
    example: 'Some title',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Post announcementPublic',
    example: 'announcementPublic',
  })
  @Expose()
  public announcementPublic?: string;

  @ApiProperty({
    description: 'Post textPublic',
    example: 'textPublic',
  })
  @Expose()
  public textPublic?: string;

  @ApiProperty({
    description: 'Post videoUrl',
    example: 'videoUrl',
  })
  @Expose()
  public videoUrl?: string;

  @ApiProperty({
    description: 'Post imageUrl',
    example: 'imageUrl',
  })
  @Expose()
  public imageUrl?: string;

  @ApiProperty({
    description: 'Post textQuote',
    example: 'textQuote',
  })
  @Expose()
  public textQuote?: string;

  @ApiProperty({
    description: 'Post quoteAuthor',
    example: 'quoteAuthor',
  })
  @Expose()
  public quoteAuthor?: string;

  @ApiProperty({
    description: 'Post link',
    example: 'link',
  })
  @Expose()
  public link?: string;

  @ApiProperty({
    description: 'Post linkDescription',
    example: 'linkDescription',
  })
  @Expose()
  public linkDescription?: string;

  @ApiProperty({
    description: 'Post isPublished',
    example: true,
  })
  @Expose()
  public isPublished: boolean;

  @Expose()
  public isRepost?: boolean;

  @Expose()
  public originalPostId?: string;

  @Expose()
  public likes: number;

  @Expose()
  public comments: number;

  @Expose()
  public reposts: number;

  @ApiProperty({
    description: 'Post tags',
    example: '["tags"]',
  })
  @Expose()
  public tags?: string[];
}
