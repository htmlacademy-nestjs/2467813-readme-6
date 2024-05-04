import { TTypePost } from './types/type-post.type';

export const DECIMAL_SYSTEM = 10;

export const AppRoutes = {
  Api: 'api',
  Auth: 'auth',
  Swagger: 'swagger',
  Posts: 'posts',
  Comments: 'comments',
  Files: 'files',
} as const;

export const Path = {
  Register: 'register',
  Comments: 'comments',
  NewPassword: 'new-password',
  Login: 'login',
  Upload: 'upload',
} as const;

export const RabbitRouting = {
  AddSubscriber: 'notify.addSubscriber',
} as const;

export const SpaceName = {
  AppBlog: 'app.blog',
  AppUser: 'app.user',
  AppFile: 'app.file',
  AppNotify: 'app.notify',
  Notify: 'notify',
  Rabbit: 'rabbit',
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
  AppPortFile: 3_002,
  AppPortNotify: 3_003,
  MongoPort: 27_017,
  RabbitPort: 5_672,
  MailSMTP: 25,
} as const;

export const PathEnvironments = {
  Notify: 'apps/notify/notify.env',
  File: 'apps/file/file.env',
  User: 'apps/user/user.env',
  Blog: 'apps/blog/blog.env',
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
export const RequiredKeysLink = ['link'];

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
