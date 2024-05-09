import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { IPost, ISubscriber } from '@project/core';
import { NotifyConfig } from '@project/notify-config';
import { SendMessageMail, Template } from '../const';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  @Inject(NotifyConfig.KEY)
  private readonly notifyConfig: ConfigType<typeof NotifyConfig>;

  public async sendNotifyNewSubscriber(subscriber: ISubscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: subscriber.email,
      subject: SendMessageMail.Subscribe,
      template: Template.Subscriber,
      context: {
        user: `${subscriber.firstName} ${subscriber.lastName}`,
        email: `${subscriber.email}`,
      },
    });
  }

  public async sendNotifyNewPosts(newPosts: IPost[], email: string) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.mail.from,
      to: email,
      subject: SendMessageMail.NewPosts,
      template: Template.Publication,
      context: {
        newPosts,
      },
    });
  }
}
