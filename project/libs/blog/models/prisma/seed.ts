import { PrismaClient } from '@prisma/client';

const FIRST_LIKE_UUID = '39614113-7ad5-45b6-8093-06455437e1e2';
// const SECOND_LIKE_UUID = 'efd775e2-df55-4e0e-a308-58249f5ea202';

const FIRST_COMMENT_UUID = '39614113-7ad5-45bs-8093-06455437e1e2';
const SECOND_COMMENT_UUID = 'efd775e2-df5s-4e0e-a308-58249f5ea202';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

function getLikes() {
  return [
    {
      id: FIRST_LIKE_UUID,
      postId: FIRST_POST_UUID,
      userId: SECOND_USER_ID,
    },
  ];
}

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      title: 'title-video 1',
      userId: FIRST_USER_ID,
      typePost: 'video',
      videoUrl: 'videoUrl',
      tags: ['video-tags', 'video-tags'],
      description:
        'На мой взгляд, это один из самых страшных романов Стивена Кинга.',
      likes: [
        {
          id: FIRST_LIKE_UUID,
          userId: SECOND_USER_ID,
        },
      ],
    },
    {
      id: SECOND_POST_UUID,
      title: 'title 2',
      typePost: 'text',
      userId: FIRST_USER_ID,
      announcementPublic: 'announcementPublic',
      textPublic: 'textPublic',
      comments: [
        {
          id: FIRST_COMMENT_UUID,
          message: 'круто',
          userId: FIRST_USER_ID,
        },
        {
          id: SECOND_COMMENT_UUID,
          message: 'супер',
          userId: SECOND_USER_ID,
        },
      ],
    },
  ];
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        title: post.title,
        typePost: post.typePost,
        videoUrl: post.videoUrl,
        announcementPublic: post.announcementPublic,
        textPublic: post.textPublic,
        userId: post.userId,
        likes: post.likes
          ? {
              create: post.likes,
            }
          : undefined,
        comments: post.comments
          ? {
              create: post.comments,
            }
          : undefined,
      },
    });
  }

  const mockLikes = getLikes();
  for (const like of mockLikes) {
    await prismaClient.like.upsert({
      where: {
        id: like.id,
      },
      update: {},
      create: {
        id: like.id,
        postId: like.postId,
        userId: like.userId,
      },
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
