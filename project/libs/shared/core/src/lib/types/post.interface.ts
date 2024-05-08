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
  image?: string;
  textQuote?: string;
  quoteAuthor?: string;
  link?: string;
  linkDescription?: string;
  isPublished?: boolean;
  isLike?: boolean;
  originalPostId?: string;
  tags?: string[];
  likes?: number;
  comments?: number;
  reposts?: number;
  isRepost?: boolean;
  originPostId?: string;
  originUserId?: string;
}
