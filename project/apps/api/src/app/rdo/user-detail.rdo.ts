import { ApiProperty } from '@nestjs/swagger';
import { OpenApiMessages } from '@project/authentication';
import { Expose } from 'class-transformer';

export class UserDetailRdo {
  @ApiProperty({
    description: OpenApiMessages.id.description,
    example: OpenApiMessages.id.example,
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: OpenApiMessages.avatarPath.description,
    example: OpenApiMessages.avatarPath.example,
  })
  @Expose()
  public avatarPath: string;

  @ApiProperty({
    description: OpenApiMessages.email.description,
    example: OpenApiMessages.email.example,
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: OpenApiMessages.firstName.description,
    example: OpenApiMessages.firstName.example,
  })
  @Expose()
  public firstName: string;

  @ApiProperty({
    description: OpenApiMessages.lastName.description,
    example: OpenApiMessages.lastName.example,
  })
  @Expose()
  public lastName: string;

  @ApiProperty({
    description: OpenApiMessages.createdAt.description,
    example: OpenApiMessages.createdAt.example,
  })
  @Expose()
  public createdAt: Date;
}
