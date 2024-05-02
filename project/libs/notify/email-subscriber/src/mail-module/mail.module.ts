import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { MailService } from './mail.service';
import { getMailerAsyncOptions } from '@project/helpers';
import { SpaceName } from '@project/constant';

@Module({
  imports: [
    MailerModule.forRootAsync(
      getMailerAsyncOptions(`${SpaceName.AppNotify}.mail`)
    ),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
