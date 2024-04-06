import { Module } from '@nestjs/common';
import { BlogUserFactory } from './blog-user.factory';
import { BlogUserRepository } from './blog-user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogUserModel, BlogUserSchema } from './blog-user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogUserModel.name, schema: BlogUserSchema },
    ]),
  ],
  providers: [BlogUserRepository, BlogUserFactory],
  exports: [BlogUserRepository],
})
export class BlogUserModule {}
