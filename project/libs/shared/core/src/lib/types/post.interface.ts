import { IComment } from './comment.interface';
import { Like } from './like.interface';
import { TTypePost } from '@project/constant';

export interface Post {
  id?: string;
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
  userId: string;
  Like: Like[];
  comments: IComment[];
}
