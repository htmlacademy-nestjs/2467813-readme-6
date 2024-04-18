export const DECIMAL_SYSTEM = 10;

export const AppRoutes = {
  Auth: 'auth',
  Swagger: 'swagger',
} as const;

export const Path = {
  Register: 'register',
  NewPassword: 'new-password',
  Login: 'login',
} as const;

export const SpaceName = {
  Application: 'application',
  MongoDB: 'mongo_db',
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

export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;
