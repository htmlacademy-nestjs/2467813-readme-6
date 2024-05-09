import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';

import { RabbitRouting } from '@project/constant';
import { rabbitConfig } from '@project/config';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class NotifyBlogService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async sendNewPosts(posts: CreatePostDto[]) {
    return this.rabbitClient.publish<CreatePostDto[]>(
      this.rabbitOptions.exchange,
      RabbitRouting.SendNewPosts,
      posts
    );
  }
}
