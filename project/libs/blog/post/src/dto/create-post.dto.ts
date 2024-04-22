import { TypePostList, TTypePost } from '@project/constant';

import { IsIn, IsMongoId, IsOptional, IsString, Length } from 'class-validator';
import {
  AnnouncementPublic,
  CreatePostValidationMessage,
  LinkDescription,
  QuoteAuthor,
  Tags,
  TextPublic,
  TextQuote,
  Title,
} from '../const';

export class CreatePostDto {
  @IsString({ message: CreatePostValidationMessage.title.invalidFormat })
  @Length(Title.Min, Title.Max, {
    message: CreatePostValidationMessage.title.lengthField,
  })
  public title: string;

  @IsString({ message: CreatePostValidationMessage.userId.invalidId })
  @IsMongoId({ message: CreatePostValidationMessage.userId.invalidId })
  public userId: string;

  @IsIn([...TypePostList], {
    message: CreatePostValidationMessage.typePost.invalidChoice,
  })
  @IsString({ message: CreatePostValidationMessage.typePost.invalidFormat })
  public typePost: TTypePost;

  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.announcementPublic.invalidFormat,
  })
  @Length(AnnouncementPublic.Min, AnnouncementPublic.Max, {
    message: CreatePostValidationMessage.announcementPublic.lengthField,
  })
  public announcementPublic?: string;

  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.textPublic.invalidFormat,
  })
  @Length(TextPublic.Min, TextPublic.Max, {
    message: CreatePostValidationMessage.textPublic.lengthField,
  })
  public textPublic?: string;

  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.videoUrl.invalidFormat,
  })
  public videoUrl?: string;

  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.imageUrl.invalidFormat,
  })
  public imageUrl?: string;

  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.textQuote.invalidFormat,
  })
  @Length(TextQuote.Min, TextQuote.Max, {
    message: CreatePostValidationMessage.textQuote.lengthField,
  })
  public textQuote?: string;

  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.quoteAuthor.invalidFormat,
  })
  @Length(QuoteAuthor.Min, QuoteAuthor.Max, {
    message: CreatePostValidationMessage.quoteAuthor.lengthField,
  })
  public quoteAuthor?: string;

  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.link.invalidFormat,
  })
  public link?: string;

  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.linkDescription.invalidFormat,
  })
  @Length(LinkDescription.Min, LinkDescription.Max, {
    message: CreatePostValidationMessage.linkDescription.lengthField,
  })
  public linkDescription?: string;

  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.tags.invalidFormat,
  })
  @Length(Tags.Min, Tags.Max, {
    message: CreatePostValidationMessage.tags.lengthField,
  })
  public tags?: string;
}
