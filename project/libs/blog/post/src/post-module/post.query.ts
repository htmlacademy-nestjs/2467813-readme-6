import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

import { SortDirection, TSortDirection } from '@project/constant';

import { PostCount } from '../const';

export class PostQuery {
  @Transform(({ value }) => +value || PostCount.Default)
  @IsNumber()
  @IsOptional()
  public limit: number = PostCount.Default;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: TSortDirection = SortDirection.Desc;

  @Transform(({ value }) => +value || PostCount.PageDefault)
  @IsOptional()
  public page: number = PostCount.PageDefault;

  @IsString()
  @IsOptional()
  public userId?: string;
}
