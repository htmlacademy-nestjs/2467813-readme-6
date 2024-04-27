export const OpenApiMessages = {
  id: {
    description: 'The uniq user ID',
    example: '6621683a9775bcf7c8f2606b',
  },
  accessToken: {
    description: 'Access token',
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
    description: 'User avatar path',
    example: '/images/user.png',
  },
} as const;