import { TTypePost } from '@project/constant';

export interface IPost {
  id?: string;
  userId: string;
  title: string;
  typePost: TTypePost;
  announcementPublic?: string;
  textPublic?: string;
  videoUrl?: string;
  imageUrl?: string;
  textQuote?: string;
  quoteAuthor?: string;
  link?: string;
  linkDescription?: string;
  isPublished: boolean;
  isRepost?: boolean;
  originalPostId?: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
  likes: number;
  comments: number;
  reposts: number;
}
