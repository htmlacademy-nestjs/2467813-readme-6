import { IComment, Entity, IStorableEntity } from '@project/core';

export class BlogCommentEntity
  extends Entity
  implements IStorableEntity<IComment>
{
  public createdAt?: Date;
  public postId?: string;
  public message: string;
  public userId: string;

  constructor(comment?: IComment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: IComment): void {
    if (!comment) {
      return;
    }

    this.id = comment.id ?? undefined;
    this.createdAt = comment.createdAt;
    this.message = comment.message;
    this.postId = comment.postId ?? undefined;
    this.userId = comment.userId;
  }

  public toPOJO(): IComment {
    return {
      id: this.id,
      createdAt: this.createdAt,
      message: this.message,
      postId: this.postId,
      userId: this.userId,
    };
  }
}
