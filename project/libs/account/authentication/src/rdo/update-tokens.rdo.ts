import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { OpenApiMessages } from '../const';

export class UpdateTokensRdo {
  @ApiProperty({
    description: OpenApiMessages.accessToken.description,
    example: OpenApiMessages.accessToken.example,
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: OpenApiMessages.refreshToken.description,
    example: OpenApiMessages.refreshToken.example,
  })
  @Expose()
  public refreshToken: string;
}
