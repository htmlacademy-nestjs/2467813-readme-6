import { TTypePost } from './types/type-post.type';
import { getFullServerPath } from '@project/helpers';

export const DECIMAL_SYSTEM = 10;
export const DEFAULT_HOST = 'localhost';

export const HttpClient = {
  MaxRedirects: 5,
  Timeout: 3_000,
} as const;

export const AppRoutes = {
  Api: 'api',
  Auth: 'auth',
  Swagger: 'swagger',
  Posts: 'posts',
  Notifications: 'notifications',
  Reposts: 'reposts',
  Comments: 'comments',
  Likes: 'likes',
  Files: 'files',
  Users: 'users',
  Blog: 'blog',
} as const;

export const Path = {
  Register: 'register',
  Comments: 'comments',
  Likes: 'likes',
  Reposts: 'reposts',
  Statistics: 'statistics',
  NewPassword: 'new-password',
  Login: 'login',
  Refresh: 'refresh',
  Check: 'check',
  Upload: 'upload',
  newsletterPosts: 'newsletter-posts',
} as const;

export const RabbitRouting = {
  AddSubscriber: 'notify.addSubscriber',
  SendNewPosts: 'notify.sendNewPosts',
} as const;

export const SpaceName = {
  AppBlog: 'app.blog',
  AppApi: 'app.api',
  AppUser: 'app.user',
  AppFile: 'app.file',
  AppNotify: 'app.notify',
  Rabbit: 'rabbit',
  MongoDB: 'mongo_db',
  Jwt: 'jwt',
  JwtRefresh: 'jwt-refresh',
  Local: 'local',
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
  AppPortApp: 3_004,
  MongoPort: 27_017,
  RabbitPort: 5_672,
  MailSMTP: 25,
} as const;

export const ApplicationServiceURL = {
  Users: `${getFullServerPath(DEFAULT_HOST, DefaultPort.AppPortUser)}/${
    AppRoutes.Api
  }/${AppRoutes.Auth}`,
  Blog: `${getFullServerPath(DEFAULT_HOST, DefaultPort.AppPortBlog)}/${
    AppRoutes.Api
  }/${AppRoutes.Posts}`,
  Notify: `${getFullServerPath(DEFAULT_HOST, DefaultPort.AppPortNotify)}/${
    AppRoutes.Api
  }`,
  File: `${getFullServerPath(DEFAULT_HOST, DefaultPort.AppPortFile)}/${
    AppRoutes.Api
  }/${AppRoutes.Files}`,
} as const;

export const Jwt = {
  algorithmHs256: 'HS256',
  expired: '2d',
} as const;

export const PathEnvironments = {
  Notify: 'apps/notify/notify.env',
  File: 'apps/file/file.env',
  User: 'apps/user/user.env',
  Blog: 'apps/blog/blog.env',
  Api: 'apps/api/api.env',
} as const;

export const Environments = ['development', 'production', 'stage'] as const;

export const SortDirection = {
  Asc: 'asc',
  Desc: 'desc',
} as const;

export const BooleanEnum = {
  True: 'true',
  False: 'false',
} as const;

export const SortOption = {
  Date: 'Date',
  Likes: 'Likes',
  Comments: 'Comments',
} as const;

export const AuthToken = {
  Name: 'AUTHORIZATION',
  Description: 'Token (формат: Bearer + "token")',
  DescriptionRefresh: 'Token (формат: Bearer + "refreshToken")',
} as const;

export const TypePostList: TTypePost[] = Object.values(TypePost);

export const AllowedKeys = [
  'typePost',
  'userId',
  'title',
  'tags',
  'linkDescription',
  'isPublished',
];
export const RequiredKeysText = ['announcementPublic', 'textPublic'];
export const RequiredKeysVideo = ['videoUrl'];
export const RequiredKeysPhoto = ['image'];
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
