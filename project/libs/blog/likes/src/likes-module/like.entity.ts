import { ILike, Entity, IStorableEntity } from '@project/core';

export class LikeEntity extends Entity implements IStorableEntity<ILike> {
  public postId?: string;
  public userId: string;

  constructor(comment?: ILike) {
    super();
    this.populate(comment);
  }

  public populate(comment?: ILike): void {
    if (!comment) {
      return;
    }

    this.id = comment.id ?? undefined;
    this.postId = comment.postId ?? undefined;
    this.userId = comment.userId;
  }

  public toPOJO(): ILike {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
    };
  }
}
