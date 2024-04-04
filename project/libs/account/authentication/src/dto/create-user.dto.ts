import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'example@email.ru',
  })
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Mikhail',
  })
  public firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Yanov',
  })
  public lastName: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
  })
  public avatarPath?: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  public password: string;
}
