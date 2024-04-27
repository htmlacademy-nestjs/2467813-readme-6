import { PrismaClient } from '@prisma/client';

const LikeListUUID = {
  First: '39614113-7ad5-45b6-8093-06455437e1e2',
  Second: 'efd775e2-df55-4e0e-a308-58249f5ea202',
} as const;

const CommentListUUID = {
  First: '39614113-7ad5-45bs-8093-06455437e1e2',
  Second: 'efd775e2-df5s-4e0e-a308-58249f5ea202',
} as const;

const PostListUUID = {
  First: '6d308040-96a2-4162-bea6-2338e9976540',
  Second: 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd',
} as const;

const UserListUUID = {
  First: '658170cbb954e9f5b905ccf4',
  Second: '6581762309c030b503e30512',
} as const;

function getLikes() {
  return [
    {
      id: LikeListUUID.First,
      postId: PostListUUID.First,
      userId: UserListUUID.Second,
    },
  ];
}

function getPosts() {
  return [
    {
      id: PostListUUID.First,
      title: 'title-video 1',
      userId: UserListUUID.First,
      typePost: 'video',
      videoUrl: 'videoUrl',
      tags: ['video-tags', 'video-tags'],
      description:
        'На мой взгляд, это один из самых страшных романов Стивена Кинга.',
      likes: [
        {
          id: LikeListUUID.First,
          userId: UserListUUID.Second,
        },
      ],
    },
    {
      id: PostListUUID.Second,
      title: 'title 2',
      typePost: 'text',
      userId: UserListUUID.First,
      announcementPublic: 'announcementPublic',
      textPublic: 'textPublic',
      comments: [
        {
          id: CommentListUUID.First,
          message: 'круто',
          userId: UserListUUID.First,
        },
        {
          id: CommentListUUID.Second,
          message: 'супер',
          userId: UserListUUID.Second,
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
