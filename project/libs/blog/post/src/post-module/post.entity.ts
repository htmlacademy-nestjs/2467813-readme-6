import { Entity, IPost, IStorableEntity } from '@project/core';
import { TTypePost } from '@project/constant';

export class PostEntity extends Entity implements IStorableEntity<IPost> {
  public title: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public userId: string;
  public typePost: TTypePost;
  public announcementPublic?: string;
  public textPublic?: string;
  public videoUrl?: string;
  public image?: string;
  public textQuote?: string;
  public quoteAuthor?: string;
  public link?: string;
  public linkDescription?: string;
  public isPublished?: boolean;
  public isLike?: boolean;
  public originalPostId?: string;
  public tags?: string[];
  public likes?: number;
  public comments?: number;
  public reposts?: number;
  public isRepost?: boolean;
  public originPostId?: string;
  public originUserId?: string;

  constructor(post?: IPost) {
    super();
    this.populate(post);
  }

  public populate(post?: IPost): void {
    if (!post) {
      return;
    }

    this.id = post.id ?? undefined;
    this.title = post.title;
    this.typePost = post.typePost;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.userId = post.userId;
    this.announcementPublic = post.announcementPublic ?? undefined;
    this.textPublic = post.textPublic ?? undefined;
    this.videoUrl = post.videoUrl ?? undefined;
    this.image = post.image ?? undefined;
    this.textQuote = post.textQuote ?? undefined;
    this.quoteAuthor = post.quoteAuthor ?? undefined;
    this.link = post.link ?? undefined;
    this.linkDescription = post.linkDescription ?? undefined;
    this.isPublished = post.isPublished ?? undefined;
    this.isLike = post.isLike ?? undefined;
    this.originalPostId = post.originalPostId ?? undefined;
    this.tags = post.tags ?? [];
    this.comments = post.comments ?? 0;
    this.likes = post.likes ?? 0;
    this.reposts = post.reposts ?? 0;
    this.isRepost = post.isRepost ?? undefined;
    this.originPostId = post.originPostId ?? undefined;
    this.originUserId = post.originUserId ?? undefined;
  }

  public toPOJO(): IPost {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      typePost: this.typePost,
      title: this.title,
      userId: this.userId,
      announcementPublic: this.announcementPublic,
      textPublic: this.textPublic,
      videoUrl: this.videoUrl,
      image: this.image,
      textQuote: this.textQuote,
      quoteAuthor: this.quoteAuthor,
      link: this.link,
      linkDescription: this.linkDescription,
      isPublished: this.isPublished,
      isLike: this.isLike,
      originalPostId: this.originalPostId,
      tags: this.tags,
      comments: this.comments,
      likes: this.likes,
      reposts: this.reposts,
      isRepost: this.isRepost,
      originPostId: this.originPostId,
      originUserId: this.originUserId,
    };
  }
}
