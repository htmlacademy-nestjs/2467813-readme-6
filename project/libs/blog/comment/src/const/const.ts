export const CommentCount = {
  default: 50,
} as const;

export const Message = {
  Min: 10,
  Max: 300,
} as const;

export const CreateCommentMessages = {
  message: {
    invalidFormat: 'message is required',
    lengthField: `min length is ${Message.Min}, max is ${Message.Max}`,
  },
  postId: {
    invalidFormat: 'postId field must be a valid id',
  },
  userId: {
    invalidFormat: 'userId field must be a valid id',
  },
} as const;

export const CommentValidateMessage = {
  InvalidID: 'Invalid author id',
} as const;
