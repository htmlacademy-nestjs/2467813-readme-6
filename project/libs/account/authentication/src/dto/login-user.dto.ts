import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { CreateUserMessages, Password } from '../const';

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'example@email.ru',
  })
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

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
