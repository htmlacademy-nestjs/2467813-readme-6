import { IsMongoId, IsString, Length } from 'class-validator';
import {
  CommentValidateMessage,
  CreateCommentMessages,
  Message,
} from '../const';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.message.invalidFormat })
  @Length(Message.Min, Message.Max, {
    message: CreateCommentMessages.message.lengthField,
  })
  public message: string;

  @IsString()
  @IsMongoId({ message: CommentValidateMessage.InvalidID })
  public userId: string;
}
