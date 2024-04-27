import { IsString, Length } from 'class-validator';
import { CreateUserMessages, Password } from '../const';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPassword {
  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(Password.Min, Password.Max, {
    message: CreateUserMessages.password.lengthField,
  })
  public password: string;

  @ApiProperty({
    description: 'User newPassword',
    example: '123456',
  })
  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(Password.Min, Password.Max, {
    message: CreateUserMessages.password.lengthField,
  })
  public newPassword: string;
}
