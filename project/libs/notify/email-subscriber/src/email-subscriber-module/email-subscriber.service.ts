/* eslint-disable @typescript-eslint/ban-ts-comment */
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
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(
      email
    );

    if (existsSubscriber) {
      return existsSubscriber;
    }

    const emailSubscriber = new EmailSubscriberEntity(subscriber);
    await this.emailSubscriberRepository.save(emailSubscriber);

    return emailSubscriber;
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

  public async updateSubscriber(email: string): Promise<EmailSubscriberEntity> {
    const existSubscriber = await this.findSubscriberByEmail(email);
    const subscriberEntity = new EmailSubscriberEntity().populate({
      ...existSubscriber,
      // newPostsUpdate: new Date(),
    });
    return await this.emailSubscriberRepository.update(
      // @ts-ignore
      subscriberEntity.id
      // subscriberEntity
    );
  }

  public async indexSubscribers(): Promise<EmailSubscriberEntity[]> {
    return await this.emailSubscriberRepository.findMany();
  }
}
