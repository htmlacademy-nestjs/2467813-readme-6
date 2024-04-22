export interface IComment {
  id?: string;
  createdAt?: Date;
  message: string;
  postId: string;
  userId: string;
}
