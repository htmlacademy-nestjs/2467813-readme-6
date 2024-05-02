import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { OpenApiMessages } from '../const';

export class UploadedFileRdo {
  @ApiProperty({
    description: OpenApiMessages.id.description,
    example: OpenApiMessages.id.example,
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: OpenApiMessages.originalName.description,
    example: OpenApiMessages.originalName.example,
  })
  @Expose()
  public originalName: string;

  @ApiProperty({
    description: OpenApiMessages.hashName.description,
    example: OpenApiMessages.hashName.example,
  })
  @Expose()
  public hashName: string;

  @ApiProperty({
    description: OpenApiMessages.subDirectory.description,
    example: OpenApiMessages.subDirectory.example,
  })
  @Expose()
  public subDirectory: string;

  @ApiProperty({
    description: OpenApiMessages.mimetype.description,
    example: OpenApiMessages.mimetype.example,
  })
  @Expose()
  public mimetype: string;

  @ApiProperty({
    description: OpenApiMessages.size.description,
    example: OpenApiMessages.size.example,
  })
  @Expose()
  public size: number;
}
