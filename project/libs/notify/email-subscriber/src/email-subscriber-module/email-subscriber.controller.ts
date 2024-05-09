import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from '../dto/create-subscriber.dto';
import { RabbitExchange, RabbitQueue, RabbitRouting } from '@project/constant';
import { MailService } from '../mail-module/mail.service';
import { IPost } from '@project/core';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: RabbitExchange.ReadmeNotify,
    routingKey: RabbitRouting.AddSubscriber,
    queue: `${RabbitExchange.ReadmeNotify}.${RabbitQueue.Subscriber}`,
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: RabbitExchange.ReadmeNotify,
    routingKey: RabbitRouting.SendNewPosts,
    queue: `${RabbitExchange.ReadmeNotify}.${RabbitQueue.Posts}`,
  })
  public async sendNewPosts(posts: IPost[]): Promise<void> {
    const userSubscribers = await this.subscriberService.getUserSubscribers();

    userSubscribers.forEach((subscriberEntity) => {
      const { email, lastNotificationTime } = subscriberEntity;
      const filterPostPublishedAt = posts.filter(
        (post) => new Date(post.createdAt) >= new Date(lastNotificationTime)
      );

      if (filterPostPublishedAt.length === 0) {
        return;
      }
      this.mailService.sendNotifyNewPosts(filterPostPublishedAt, email);
      this.subscriberService.updateSubscriber(email);
    });
  }
}
