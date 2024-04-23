export interface IComment {
  [key: string]: unknown;
  id?: string;
  postId: string;
  userId: string;
  createdAt?: Date;
  message: string;
}
