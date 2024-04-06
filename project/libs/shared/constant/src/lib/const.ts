export const DECIMAL_SYSTEM = 10;

export const AppRoutes = {
  Auth: 'auth',
  Swagger: 'swagger',
} as const;

export const Path = {
  Register: 'register',
  Login: 'login',
} as const;

export const SpaceName = {
  Application: 'application',
  MongoDB: 'mongo_db',
} as const;

export const DefaultPort = {
  AppPort: 3_000,
  MongoPort: 27_017,
} as const;

export const ENVIRONMENTS = ['development', 'production', 'stage'] as const;
