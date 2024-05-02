import { ILike, Entity, IStorableEntity } from '@project/core';

export class LikeEntity extends Entity implements IStorableEntity<ILike> {
  public postId?: string;
  public userId: string;

  constructor(like?: ILike) {
    super();
    this.populate(like);
  }

  public populate(like?: ILike): void {
    if (!like) {
      return;
    }

    this.id = like.id ?? undefined;
    this.postId = like.postId ?? undefined;
    this.userId = like.userId;
  }

  public toPOJO(): ILike {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
    };
  }
}
