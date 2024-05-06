import { TTypePost } from '@project/constant';

export interface IPost {
  id?: string;
  userId: string;
  title: string;
  typePost: TTypePost;
  createdAt?: Date;
  updatedAt?: Date;
  announcementPublic?: string;
  textPublic?: string;
  videoUrl?: string;
  imageUrl?: string;
  textQuote?: string;
  quoteAuthor?: string;
  link?: string;
  linkDescription?: string;
  isPublished?: boolean;
  isRepost?: boolean;
  isLike?: boolean;
  originalPostId?: string;
  tags?: string[];
  likes?: number;
  comments?: number;
  reposts?: number;
}
