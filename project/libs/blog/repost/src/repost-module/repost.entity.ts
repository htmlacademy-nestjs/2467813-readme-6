import { IRepost, Entity, IStorableEntity } from '@project/core';

export class RepostEntity extends Entity implements IStorableEntity<IRepost> {
  public postId?: string;
  public userId: string;

  constructor(repost?: IRepost) {
    super();
    this.populate(repost);
  }

  public populate(repost?: IRepost): void {
    if (!repost) {
      return;
    }

    this.id = repost.id ?? undefined;
    this.postId = repost.postId ?? undefined;
    this.userId = repost.userId;
  }

  public toPOJO(): IRepost {
    return {
      id: this.id,
      postId: this.postId,
      userId: this.userId,
    };
  }
}
