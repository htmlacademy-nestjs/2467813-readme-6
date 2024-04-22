import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public createdAt: Date;

  @Expose()
  public message: string;

  @Expose()
  public postId: string;

  @Expose()
  public userId: string;
}
