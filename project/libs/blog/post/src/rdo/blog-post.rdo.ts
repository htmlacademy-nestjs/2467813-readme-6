import { Expose } from 'class-transformer';
import { TTypePost } from '@project/constant';

export class PostRdo {
  @Expose()
  public id: string;

  @Expose()
  public userId: string;

  @Expose()
  public title: string;

  @Expose()
  public typePost: TTypePost;

  @Expose()
  public announcementPublic?: string;

  @Expose()
  public textPublic?: string;

  @Expose()
  public videoUrl?: string;

  @Expose()
  public imageUrl?: string;

  @Expose()
  public textQuote?: string;

  @Expose()
  public quoteAuthor?: string;

  @Expose()
  public link?: string;

  @Expose()
  public linkDescription?: string;

  @Expose()
  public tags?: string;

  @Expose()
  public likes: number;

  @Expose()
  public comments: number;

  @Expose()
  public reposts: number;

  @Expose()
  public isPublished: boolean;

  @Expose()
  public isRepost?: boolean;

  @Expose()
  public originalPostId?: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public updatedAt: string;
}
