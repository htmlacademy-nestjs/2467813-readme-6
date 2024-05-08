import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { ISubscriber } from '@project/core';
import { NotifyConfig } from '@project/notify-config';

export const EMAIL_ADD_SUBSCRIBER_SUBJECT = 'Подписка на рассылку оформлена';
export const SEND_NEW_POSTS_SUBJECT = 'Новые публикации по подписке';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(NotifyConfig.KEY)
  private readonly notifyConfig: ConfigType<typeof NotifyConfig>;

  public async sendNotifyNewSubscriber(subscriber: ISubscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstName} ${subscriber.lastName}`,
        email: `${subscriber.email}`,
      },
    });
  }

  public async sendNotifyNewPosts({ newPosts, email }: any) {
    console.log('sendNotifyNewPosts ===>', newPosts, email);
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: email,
      subject: SEND_NEW_POSTS_SUBJECT,
      template: './list-new-publications',
      context: {
        newPosts,
      },
    });
  }
}
