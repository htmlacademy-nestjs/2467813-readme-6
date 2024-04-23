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
  public imageUrl?: string;
  public textQuote?: string;
  public quoteAuthor?: string;
  public link?: string;
  public linkDescription?: string;
  public isPublished?: boolean;
  public isRepost?: boolean;
  public originalPostId?: string;
  public tags?: string[];
  // public likes?: number;
  // public comments?: number;
  // public reposts?: number;

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
    this.imageUrl = post.imageUrl ?? undefined;
    this.textQuote = post.textQuote ?? undefined;
    this.quoteAuthor = post.quoteAuthor ?? undefined;
    this.link = post.link ?? undefined;
    this.linkDescription = post.linkDescription ?? undefined;
    this.isPublished = post.isPublished ?? undefined;
    this.isRepost = post.isRepost ?? undefined;
    this.originalPostId = post.originalPostId ?? undefined;
    this.tags = post.tags ?? [];
    // this.likes = 0;
    // this.comments = 0;
    // this.reposts = 0;
  }

  public toPOJO(): IPost {
    return {
      // id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      typePost: this.typePost,
      title: this.title,
      userId: this.userId,
      announcementPublic: this.announcementPublic,
      textPublic: this.textPublic,
      videoUrl: this.videoUrl,
      imageUrl: this.imageUrl,
      textQuote: this.textQuote,
      quoteAuthor: this.quoteAuthor,
      link: this.link,
      linkDescription: this.linkDescription,
      isPublished: this.isPublished,
      isRepost: this.isRepost,
      originalPostId: this.originalPostId,
      tags: this.tags,
      // likes: 0,
      // comments: 0,
      // reposts: 0,
    };
  }
}
