import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { CreateUserMessages, OpenApiMessages, Password } from '../const';

export class LoginUserDto {
  @ApiProperty({
    description: OpenApiMessages.email.description,
    example: OpenApiMessages.email.example,
  })
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

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
