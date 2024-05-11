export const ExceptionMessage = {
  PublishPhoto: {
    message: 'To publish a photo, you need a file',
  },
  NotImplemented: {
    message: 'Not implemented',
  },
  EntityNotFound: {
    message: 'Entity not found',
  },
  BadEntity: {
    message: 'Bad entity ID',
  },
  PipeParam: {
    message: 'This pipe must used only with params!',
  },
  ParseTimeNan: {
    message: `[parseTime] Can't parse value count. Result is NaN.`,
  },
  ParseTime: {
    message: `[parseTime] Bad time string:`,
  },
  LikeForbidden: {
    message: 'You can`t add a like twice',
  },
  LikeNotFound: {
    message: 'You can`t delete a like that doesn`t exist',
  },
  FieldsInvalidMissing: {
    message: 'Invalid post type or missing required fields',
  },
  FieldsMissing: {
    message: 'Missing field:',
  },
  FieldsUnexpected: {
    message: 'Unexpected field:',
  },
  RepostConflict: {
    message: 'Repost already exists',
  },
  RepostBadRequest: {
    message: 'You cannot edit a repost',
  },
  RepostForbidden: {
    message: 'You can`t repost your posts',
  },
  LikeBadRequest: {
    message: 'You can`t put a like when the post is not cheated',
  },
  FileBadRequest: {
    message: 'Only jpg, jpeg, and png files are allowed!',
  },
  FileSizeAvatar: {
    message: 'File is too large. Maximum size is 500KB.',
  },
  FileSizeImage: {
    message: 'File is too large. Maximum size is 1MB.',
  },
  FileSave: {
    message: `Can't save file`,
  },
  SubscriberNotFound: {
    message: 'The subscriber has not been found',
  },
} as const;
