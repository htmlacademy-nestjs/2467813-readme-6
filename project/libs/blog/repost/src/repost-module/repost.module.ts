import { Module } from '@nestjs/common';
import { RepostService } from './repost.service';
import { RepostRepository } from './repost.repository';
import { RespotFactory } from './repost.factory';
import { PrismaClientModule } from '@project/models';

@Module({
  imports: [PrismaClientModule],
  controllers: [],
  providers: [RepostService, RepostRepository, RespotFactory],
  exports: [RepostService, RepostRepository],
})
export class RepostModule {}
