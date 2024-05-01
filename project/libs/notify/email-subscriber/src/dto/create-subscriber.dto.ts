import { IsEmail, IsNotEmpty } from 'class-validator';

import { CreateEmailValidationMessage } from '../const';

export class CreateSubscriberDto {
  @IsEmail({}, { message: CreateEmailValidationMessage.email.invalidFormat })
  public email: string;

  @IsNotEmpty({ message: CreateEmailValidationMessage.firstName.invalidFormat })
  public firstName: string;

  @IsNotEmpty({ message: CreateEmailValidationMessage.lastName.invalidFormat })
  public lastName: string;
}
