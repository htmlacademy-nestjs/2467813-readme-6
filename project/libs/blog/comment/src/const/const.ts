export const CommentCount = {
  Default: 50,
  PageDefault: 1,
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

export const CommentResponseMessage = {
  CommentListSuccess: 'Список комментариев',
  CreatedSuccess: 'Создание нового комментария.',
  DeleteSuccess: 'Удаление комментария.',
  NotFound: 'Поста с указанным идентификатором не найдено',
  IsNotLogged: 'The token is invalid or expired.',
} as const;
