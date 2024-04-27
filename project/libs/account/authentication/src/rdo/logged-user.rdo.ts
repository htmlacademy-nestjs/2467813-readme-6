import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { OpenApiMessages } from '../const';

export class LoggedUserRdo {
  @ApiProperty({
    description: OpenApiMessages.id.description,
    example: OpenApiMessages.id.example,
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: OpenApiMessages.email.description,
    example: OpenApiMessages.email.example,
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: OpenApiMessages.accessToken.description,
    example: OpenApiMessages.accessToken.example,
  })
  @Expose()
  public accessToken: string;
}
