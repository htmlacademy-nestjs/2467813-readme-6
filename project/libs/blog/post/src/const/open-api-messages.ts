export const OpenApiMessages = {
  id: {
    description: 'The uniq post ID',
    example: '4e182f32-1497-4663-8e9b-7b06187c27cd',
  },
  postId: {
    description: 'The uniq post ID',
    example: '4e182f32-1497-4663-8e9b-7b06187c27cd',
  },
  userId: {
    description: 'The unique userId MongoDB',
    example: '6621683a9775bcf7c8f2606b',
    name: 'userId',
  },
  createdAt: {
    description: 'Post createdAt',
    example: '2024-04-23 10:04:27.508',
  },
  updatedAt: {
    description: 'Post updatedAt',
    example: '2024-04-23 10:04:27.508',
  },
  title: {
    description: 'Post title',
    example: 'Some title',
  },
  typePost: {
    description: 'type must be video, text, quote, photo or link',
    example: 'text',
    name: 'typePost',
  },
  announcementPublic: {
    description: 'Post announcementPublic',
    example: 'announcementPublic',
  },
  textPublic: {
    description: 'Post textPublic',
    example: 'textPublic',
  },
  videoUrl: {
    description: 'Post URL of the YouTube video',
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  image: {
    description: 'Post image',
    example: 'image',
  },
  textQuote: {
    description: 'Post textQuote',
    example: 'textQuote',
  },
  quoteAuthor: {
    description: 'Post quoteAuthor',
    example: 'quoteAuthor',
  },
  link: {
    description: 'Post link',
    example: 'link',
  },
  linkDescription: {
    description: 'Post linkDescription',
    example: 'linkDescription',
  },
  tags: {
    description: 'Post tags',
    example: '["tag"]',
    name: 'tags',
  },
  entities: {
    description: 'Post list entities',
    example: '',
  },
  totalPages: {
    description: 'Post list totalPages',
    example: 1,
  },
  totalItems: {
    description: 'Post list totalItems',
    example: 1,
  },
  currentPage: {
    description: 'Post list currentPage',
    example: 1,
  },
  itemsPerPage: {
    description: 'Post list itemsPerPage',
    example: 1,
  },
  isPublished: {
    description: 'Post isPublished',
    example: true,
    name: 'isPublished',
  },
  comments: {
    description: 'Post comments',
    example: 2,
  },
  likes: {
    description: 'Post likes',
    example: 1,
  },
  reposts: {
    description: 'Post reposts',
    example: 4,
  },
  isLike: {
    description: 'isLike like',
    example: false,
  },
  isRepost: {
    description: 'isRepost repost',
    example: true,
  },
  sortOption: {
    name: 'sortOption',
  },
  sortDirection: {
    name: 'sortDirection',
  },
  page: {
    name: 'page',
  },
  limit: {
    name: 'limit',
  },
  path: {
    create: {
      summary: 'Создать пост',
    },
    createOrDeleteLike: {
      summary: 'Создать/Удалить лайк к посту',
    },
    createRepost: {
      summary: 'Создать репост',
    },
    listPost: {
      summary: 'Получить список постов',
    },
    DetailPost: {
      summary: 'Получить детальный пост',
    },
    UpdatePost: {
      summary: 'Редактировать пост',
    },
    DeletePost: {
      summary: 'Удалить пост',
    },
  },
};
