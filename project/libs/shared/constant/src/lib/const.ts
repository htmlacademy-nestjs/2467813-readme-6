import { TTypePost } from './types/type-post.type';

export const DECIMAL_SYSTEM = 10;

export const AppRoutes = {
  Api: 'api',
  Auth: 'auth',
  Swagger: 'swagger',
  Posts: 'posts',
  Comments: 'comments',
} as const;

export const Path = {
  Register: 'register',
  Comments: 'comments',
  NewPassword: 'new-password',
  Login: 'login',
} as const;

export const SpaceName = {
  Application: 'application',
  MongoDB: 'mongo_db',
  Jwt: 'jwt',
} as const;

export const TypePost = {
  Video: 'video',
  Text: 'text',
  Quote: 'quote',
  Photo: 'photo',
  Link: 'link',
} as const;

export const DefaultPort = {
  AppPortUser: 3_000,
  AppPortBlog: 3_001,
  MongoPort: 27_017,
} as const;

export const Environments = ['development', 'production', 'stage'] as const;

export const SortDirection = {
  Asc: 'asc',
  Desc: 'desc',
} as const;

export const AuthToken = {
  Name: 'AUTHORIZATION',
  Description: 'Token (формат: Bearer + "token")',
} as const;

export const TypePostList: TTypePost[] = Object.values(TypePost);

export const AllowedKeys = ['typePost', 'userId', 'title', 'tags'];
export const RequiredKeysText = ['announcementPublic', 'textPublic'];
export const RequiredKeysVideo = ['videoUrl'];
export const RequiredKeysPhoto = ['imageUrl'];
export const RequiredKeysQuote = ['textQuote', 'quoteAuthor'];
export const RequiredKeysLink = ['link', 'linkDescription'];

export const PostTypeToKeys = {
  [TypePost.Link]: {
    requiredKeys: RequiredKeysLink,
    allowedKeys: [...RequiredKeysLink, ...AllowedKeys],
  },
  [TypePost.Photo]: {
    requiredKeys: RequiredKeysPhoto,
    allowedKeys: [...RequiredKeysPhoto, ...AllowedKeys],
  },
  [TypePost.Quote]: {
    requiredKeys: RequiredKeysQuote,
    allowedKeys: [...RequiredKeysQuote, ...AllowedKeys],
  },
  [TypePost.Text]: {
    requiredKeys: RequiredKeysText,
    allowedKeys: [...RequiredKeysText, ...AllowedKeys],
  },
  [TypePost.Video]: {
    requiredKeys: RequiredKeysVideo,
    allowedKeys: [...RequiredKeysVideo, ...AllowedKeys],
  },
} as const;
