import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: 'd45dc925-bbb2-455f-8a07-ff5ca27674a0',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
  })
  @Expose()
  public avatarPath: string;

  @ApiProperty({
    description: 'User unique address',
    example: 'example@email.ru',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Mikhail',
  })
  @Expose()
  public firstName: string;

  @ApiProperty({
    description: 'User unique address',
    example: 'example@email.ru',
  })
  @Expose()
  public lastName: string;
}
