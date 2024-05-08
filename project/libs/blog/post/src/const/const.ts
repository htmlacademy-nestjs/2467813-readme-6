import { TypePost } from '@project/constant';

export const PostCount = {
  Default: 25,
  SearchDefault: 20,
  PageDefault: 1,
} as const;

export const Title = {
  Min: 20,
  Max: 50,
} as const;

export const AnnouncementPublic = {
  Min: 50,
  Max: 255,
} as const;

export const TextPublic = {
  Min: 100,
  Max: 1_024,
} as const;

export const TextQuote = {
  Min: 20,
  Max: 300,
} as const;

export const QuoteAuthor = {
  Min: 3,
  Max: 50,
} as const;

export const LinkDescription = {
  Min: 0,
  Max: 300,
} as const;

export const Tags = {
  Min: 3,
  Max: 10,
  limit: 8,
} as const;

export const CreatePostValidationMessage = {
  title: {
    invalidFormat: 'The title must be a string',
    lengthField: `min length is ${Title.Min}, max is ${Title.Max}`,
  },
  typePost: {
    invalidChoice: `type must be ${TypePost.Video}, ${TypePost.Text}, ${TypePost.Quote}, ${TypePost.Photo} or ${TypePost.Link}`,
    invalidFormat: `typePost must be an string`,
  },
  announcementPublic: {
    invalidFormat: 'The announcementPublic must be a string',
    lengthField: `min length for announcementPublic is ${AnnouncementPublic.Min}, max is ${AnnouncementPublic.Max}`,
  },
  textPublic: {
    invalidFormat: 'The textPublic must be a string',
    lengthField: `min length for textPublic is ${TextPublic.Min}, max is ${TextPublic.Max}`,
  },
  videoUrl: {
    invalidFormat: 'The URL must be a valid YouTube video URL',
    isUrl: 'videoUrl must be a valid URL',
  },
  image: {
    invalidFormat: 'The image must be a string',
    isUrl: 'image must be a valid URL',
    isSize: 'image Maximum photo size: 1 megabyte',
    matches: 'The image must include an extension.jpg or .png',
  },
  textQuote: {
    invalidFormat: 'The textQuote must be a string',
    lengthField: `min length for textQuote is ${TextQuote.Min}, max is ${TextQuote.Max}`,
  },
  quoteAuthor: {
    invalidFormat: 'he quoteAuthor must be a string',
    lengthField: `min length for quoteAuthor is ${QuoteAuthor.Min}, max is ${QuoteAuthor.Max}`,
  },
  link: {
    invalidFormat: 'The link must be a string',
    isUrl: 'link must be a valid URL',
  },
  linkDescription: {
    invalidFormat: `linkDescription must be an string`,
    lengthField: `min length for linkDescription is ${LinkDescription.Min}, max is ${LinkDescription.Max}`,
  },
  tags: {
    invalidFormat: `Field tags must be an array and type must be an string`,
    lengthField: `min length for tags is ${Tags.Min}, max is ${Tags.Max}, and limit ${Tags.limit}`,
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
} as const;

export const PostResponseMessage = {
  PostDetailSuccess: 'Детальный пост',
  PostListSuccess: 'Список постов',
  CreatedSuccess: 'Создание нового поста.',
  UpdateSuccess: 'Редактирование поста.',
  DeleteSuccess: 'Удаление поста.',
  NotFound: 'Поста с указанным идентификатором не найдено',
  IsNotLogged: 'The token is invalid or expired.',
  IsRepostExists: 'Repost already exists',
  IsYourRepost: 'You can`t repost your posts',
} as const;

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

export const CreateRepostMessages = {
  isRepost: {
    invalidFormat: 'isRepost is required',
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

export const LikeResponseMessage = {
  LikeSuccess: 'Создание/Удаление нового лайка.',
  NotFound: 'Поста с указанным идентификатором не найдено',
  IsNotLogged: 'The token is invalid or expired.',
} as const;

export const RepostResponseMessage = {
  RepostSuccess: 'Создание/Удаление нового репоста.',
  NotFound: 'Поста с указанным идентификатором не найдено',
  IsNotLogged: 'The token is invalid or expired.',
} as const;
