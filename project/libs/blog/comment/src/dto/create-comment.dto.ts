import { IsMongoId, IsString, Length } from 'class-validator';
import {
  CommentValidateMessage,
  CreateCommentMessages,
  Message,
} from '../const';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment message',
    example: 'message',
  })
  @IsString({ message: CreateCommentMessages.message.invalidFormat })
  @Length(Message.Min, Message.Max, {
    message: CreateCommentMessages.message.lengthField,
  })
  public message: string;

  @ApiProperty({
    description: 'The uniq user ID',
    example: '6621683a9775bcf7c8f2606b',
  })
  @IsString()
  @IsMongoId({ message: CommentValidateMessage.InvalidID })
  public userId: string;
}
