import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from '../dto/create-subscriber.dto';
import { RabbitRouting } from '@project/constant';
import { MailService } from '../mail-module/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify.queue',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.SendNewPosts,
    queue: 'readme.notify.posts',
  })
  public async sendNewPosts(posts: any[]): Promise<void> {
    const subscriberEntitiesList =
      await this.subscriberService.indexSubscribers();
    // subscriberEntitiesList.forEach((subscriberEntity) => {
    //   const { email } = subscriberEntity;
    //   const dto: any = {
    //     email,
    //     // posts: filterNewPosts(posts, newPostsUpdate),
    //     // posts: newPostsUpdate,
    //   };
    //   this.mailService.sendNotifyNewPosts(dto);
    //   this.subscriberService.updateSubscriber(email);
    // });
    console.log('posts==>', posts);
    console.log('subscriberEntitiesList==>', subscriberEntitiesList);
  }
}
