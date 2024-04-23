import { TypePostList, TTypePost } from '@project/constant';

import {
  ArrayMaxSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsIn,
  IsLowercase,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
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
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Some title',
  })
  @IsString({ message: CreatePostValidationMessage.title.invalidFormat })
  @Length(Title.Min, Title.Max, {
    message: CreatePostValidationMessage.title.lengthField,
  })
  public title: string;

  @ApiProperty({
    description: 'Post unique userId MongoDB',
    example: '6621683a9775bcf7c8f2606b',
  })
  @IsString({ message: CreatePostValidationMessage.userId.invalidId })
  @IsMongoId({ message: CreatePostValidationMessage.userId.invalidId })
  public userId: string;

  @ApiProperty({
    description: CreatePostValidationMessage.typePost.invalidChoice,
    example: 'text',
  })
  @IsIn([...TypePostList], {
    message: CreatePostValidationMessage.typePost.invalidChoice,
  })
  @IsString({ message: CreatePostValidationMessage.typePost.invalidFormat })
  public typePost: TTypePost;

  @ApiProperty({
    description: 'Post announcementPublic',
    example: 'announcementPublic',
  })
  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.announcementPublic.invalidFormat,
  })
  @Length(AnnouncementPublic.Min, AnnouncementPublic.Max, {
    message: CreatePostValidationMessage.announcementPublic.lengthField,
  })
  public announcementPublic?: string;

  @ApiProperty({
    description: 'Post textPublic',
    example: 'textPublic',
  })
  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.textPublic.invalidFormat,
  })
  @Length(TextPublic.Min, TextPublic.Max, {
    message: CreatePostValidationMessage.textPublic.lengthField,
  })
  public textPublic?: string;

  @ApiProperty({
    description: 'Post videoUrl',
    example: 'videoUrl',
  })
  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.videoUrl.invalidFormat,
  })
  public videoUrl?: string;

  @ApiProperty({
    description: 'Post imageUrl',
    example: 'imageUrl',
  })
  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.imageUrl.invalidFormat,
  })
  public imageUrl?: string;

  @ApiProperty({
    description: 'Post textQuote',
    example: 'textQuote',
  })
  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.textQuote.invalidFormat,
  })
  @Length(TextQuote.Min, TextQuote.Max, {
    message: CreatePostValidationMessage.textQuote.lengthField,
  })
  public textQuote?: string;

  @ApiProperty({
    description: 'Post quoteAuthor',
    example: 'quoteAuthor',
  })
  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.quoteAuthor.invalidFormat,
  })
  @Length(QuoteAuthor.Min, QuoteAuthor.Max, {
    message: CreatePostValidationMessage.quoteAuthor.lengthField,
  })
  public quoteAuthor?: string;

  @ApiProperty({
    description: 'Post link',
    example: 'link',
  })
  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.link.invalidFormat,
  })
  public link?: string;

  @ApiProperty({
    description: 'Post linkDescription',
    example: 'linkDescription',
  })
  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.linkDescription.invalidFormat,
  })
  @Length(LinkDescription.Min, LinkDescription.Max, {
    message: CreatePostValidationMessage.linkDescription.lengthField,
  })
  public linkDescription?: string;

  @ApiProperty({
    description: 'Post tags',
    example: '["tags"]',
  })
  @IsOptional()
  @ValidateIf((_, value) => value != null)
  @IsArray({
    message: CreatePostValidationMessage.tags.invalidFormat,
  })
  @ArrayMaxSize(8)
  @ArrayUnique()
  @IsLowercase({ each: true })
  @MaxLength(Tags.Max, {
    each: true,
    message: CreatePostValidationMessage.tags.lengthField,
  })
  @MinLength(Tags.Min, {
    each: true,
    message: CreatePostValidationMessage.tags.lengthField,
  })
  @ArrayNotEmpty()
  public tags?: string[];
}
