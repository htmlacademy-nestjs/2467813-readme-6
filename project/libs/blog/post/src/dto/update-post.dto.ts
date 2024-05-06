import {
  ArrayMaxSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsLowercase,
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
  OpenApiMessages,
  QuoteAuthor,
  Tags,
  TextPublic,
  TextQuote,
  Title,
} from '../const';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    description: OpenApiMessages.title.description,
    example: OpenApiMessages.title.example,
  })
  @IsOptional()
  @IsString({ message: CreatePostValidationMessage.title.invalidFormat })
  @Length(Title.Min, Title.Max, {
    message: CreatePostValidationMessage.title.lengthField,
  })
  public title?: string;

  @ApiProperty({
    description: OpenApiMessages.announcementPublic.description,
    example: OpenApiMessages.announcementPublic.example,
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
    description: OpenApiMessages.textPublic.description,
    example: OpenApiMessages.textPublic.example,
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
    description: OpenApiMessages.videoUrl.description,
    example: OpenApiMessages.videoUrl.example,
  })
  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.videoUrl.invalidFormat,
  })
  public videoUrl?: string;

  @ApiProperty({
    description: OpenApiMessages.imageUrl.description,
    example: OpenApiMessages.imageUrl.example,
  })
  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.imageUrl.invalidFormat,
  })
  public imageUrl?: string;

  @ApiProperty({
    description: OpenApiMessages.textQuote.description,
    example: OpenApiMessages.textQuote.example,
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
    description: OpenApiMessages.quoteAuthor.description,
    example: OpenApiMessages.quoteAuthor.example,
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
    description: OpenApiMessages.link.description,
    example: OpenApiMessages.link.example,
  })
  @IsOptional()
  @IsString({
    message: CreatePostValidationMessage.link.invalidFormat,
  })
  public link?: string;

  @ApiProperty({
    description: OpenApiMessages.linkDescription.description,
    example: OpenApiMessages.linkDescription.example,
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
    description: OpenApiMessages.isPublished.description,
    example: OpenApiMessages.isPublished.example,
  })
  @IsOptional()
  @IsBoolean()
  public isPublished?: boolean;

  @ApiProperty({
    description: OpenApiMessages.tags.description,
    example: OpenApiMessages.tags.example,
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
  public tags?: string;
}
