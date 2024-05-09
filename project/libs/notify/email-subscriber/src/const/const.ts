export const Template = {
  Subscriber: './add-subscriber',
  Publication: './list-new-publications',
} as const;

export const CreateEmailValidationMessage = {
  firstName: {
    invalidFormat: 'The firstName is empty',
  },
  lastName: {
    invalidFormat: 'The lastName is empty',
  },
  email: {
    invalidFormat: 'The email is not valid',
  },
};

export const SendMessageMail = {
  Subscribe: 'Подписка на рассылку оформлена',
  NewPosts: 'Новые публикации по подписке',
} as const;
