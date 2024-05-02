export const CreateLikeMessages = {
  isLike: {
    invalidFormat: 'isLike is required',
  },
  postId: {
    invalidFormat: 'postId field must be a valid id',
  },
  userId: {
    invalidFormat: 'userId field must be a valid id',
  },
} as const;

export const LikeValidateMessage = {
  InvalidID: 'Invalid author id',
} as const;
