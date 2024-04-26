import { IsMongoId, IsString, Length } from 'class-validator';
import {
  CommentValidateMessage,
  CreateCommentMessages,
  Message,
  OpenApiMessages,
} from '../const';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: OpenApiMessages.message.description,
    example: OpenApiMessages.message.example,
  })
  @IsString({ message: CreateCommentMessages.message.invalidFormat })
  @Length(Message.Min, Message.Max, {
    message: CreateCommentMessages.message.lengthField,
  })
  public message: string;

  @ApiProperty({
    description: OpenApiMessages.userId.description,
    example: OpenApiMessages.userId.example,
  })
  @IsString()
  @IsMongoId({ message: CommentValidateMessage.InvalidID })
  public userId: string;
}
