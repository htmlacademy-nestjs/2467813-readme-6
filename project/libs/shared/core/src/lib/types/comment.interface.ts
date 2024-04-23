export interface IComment {
  id?: string;
  postId: string;
  userId: string;
  createdAt?: Date;
  message: string;
}
