import { IsString, Length } from 'class-validator';
import { CreateUserMessages, OpenApiMessages, Password } from '../const';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPassword {
  @ApiProperty({
    description: OpenApiMessages.password.description,
    example: OpenApiMessages.password.example,
  })
  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(Password.Min, Password.Max, {
    message: CreateUserMessages.password.lengthField,
  })
  public password: string;

  @ApiProperty({
    description: OpenApiMessages.newPassword.description,
    example: OpenApiMessages.newPassword.example,
  })
  @IsString({ message: CreateUserMessages.newPassword.invalidFormat })
  @Length(Password.Min, Password.Max, {
    message: CreateUserMessages.newPassword.lengthField,
  })
  public newPassword: string;
}
