import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { CreateUserMessages, Name, OpenApiMessages, Password } from '../const';

export class CreateUserDto {
  @ApiProperty({
    description: OpenApiMessages.email.description,
    example: OpenApiMessages.email.example,
  })
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @ApiProperty({
    description: OpenApiMessages.firstName.description,
    example: OpenApiMessages.firstName.example,
  })
  @IsString({ message: CreateUserMessages.firstName.invalidFormat })
  @Length(Name.Min, Name.Max, {
    message: CreateUserMessages.firstName.lengthField,
  })
  public firstName: string;

  @ApiProperty({
    description: OpenApiMessages.lastName.description,
    example: OpenApiMessages.lastName.example,
  })
  @IsString({ message: CreateUserMessages.lastName.invalidFormat })
  @Length(Name.Min, Name.Max, {
    message: CreateUserMessages.lastName.lengthField,
  })
  public lastName: string;

  @ApiProperty({
    description: OpenApiMessages.avatarPath.description,
    example: OpenApiMessages.avatarPath.example,
  })
  @IsString()
  @IsOptional()
  public avatarPath?: string;

  @ApiProperty({
    description: OpenApiMessages.password.description,
    example: OpenApiMessages.password.example,
  })
  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(Password.Min, Password.Max, {
    message: CreateUserMessages.password.lengthField,
  })
  public password: string;
}
