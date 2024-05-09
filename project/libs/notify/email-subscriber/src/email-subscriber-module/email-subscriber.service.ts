import { Injectable, NotFoundException } from '@nestjs/common';

import { EmailSubscriberEntity } from './email-subscriber.entity';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateSubscriberDto } from '../../../email-subscriber/src/dto/create-subscriber.dto';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    await this.findSubscriberByEmail(email);

    const emailSubscriber = new EmailSubscriberEntity(subscriber);
    await this.emailSubscriberRepository.save(emailSubscriber);

    return emailSubscriber;
  }

  public async updateSubscriber(email: string): Promise<EmailSubscriberEntity> {
    const existSubscriber = await this.findSubscriberByEmail(email);

    const subscriberEntity = new EmailSubscriberEntity(existSubscriber);
    subscriberEntity.lastNotificationTime = new Date();
    return await this.emailSubscriberRepository.update(subscriberEntity);
  }

  public async findSubscriberByEmail(
    email: string
  ): Promise<EmailSubscriberEntity> {
    const existSubscriber = await this.emailSubscriberRepository.findByEmail(
      email
    );
    if (!existSubscriber) {
      throw new NotFoundException('The subscriber has not been found');
    }
    return existSubscriber;
  }

  public async getUserSubscribers(): Promise<EmailSubscriberEntity[]> {
    return await this.emailSubscriberRepository.findMany();
  }
}
