import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { CreateUserMessages, Name, Password } from '../const';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'example@email.ru',
  })
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Mikhail',
  })
  @IsString({ message: CreateUserMessages.firstName.invalidFormat })
  @Length(Name.Min, Name.Max, {
    message: CreateUserMessages.firstName.lengthField,
  })
  public firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Yanov',
  })
  @IsString({ message: CreateUserMessages.lastName.invalidFormat })
  @Length(Name.Min, Name.Max, {
    message: CreateUserMessages.lastName.lengthField,
  })
  public lastName: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
  })
  @IsString()
  @IsOptional()
  public avatarPath?: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(Password.Min, Password.Max, {
    message: CreateUserMessages.password.lengthField,
  })
  public password: string;
}
