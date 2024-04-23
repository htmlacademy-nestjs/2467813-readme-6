import { TTypePost } from './types/type-post.type';

export const DECIMAL_SYSTEM = 10;

export const AppRoutes = {
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
  AppPort: 3_000,
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
