export const OpenApiMessages = {
  id: {
    description: 'The uniq user ID',
    example: '6621683a9775bcf7c8f2606b',
  },
  accessToken: {
    description: 'Access token',
    example: 'token',
  },
  refreshToken: {
    description: 'RefreshT token',
    example: 'token',
  },
  firstName: {
    description: 'User first name',
    example: 'Mikhail',
  },
  lastName: {
    description: 'User last name',
    example: 'Yanov',
  },
  createdAt: {
    description: 'User createdAt',
    example: '2024-04-23 10:04:27.508',
  },
  countPublic: {
    description: 'User countPublic',
    example: 3,
  },
  email: {
    description: 'User unique address',
    example: 'example@email.ru',
  },
  password: {
    description: 'User password',
    example: '123456',
  },
  newPassword: {
    description: 'newPassword is required',
    example: '1234567',
  },
  avatarPath: {
    description: 'User avatar path id',
    example: '663ca1162b515bddbaa7e64c',
  },
  path: {
    register: {
      summary: 'Регистрация пользователя',
    },
    login: {
      summary: 'Авторизация пользователя',
    },
    NewPassword: {
      summary: 'Изменить пароль пользователя',
    },
    Refresh: {
      summary: 'Запросить новую пару токенов',
    },
    DetailUser: {
      summary: 'Запросить детальную информацию пользователя',
    },
  },
} as const;
