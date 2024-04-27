import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';

import { SortDirection, TSortDirection } from '@project/constant';

import { CommentCount } from '../const';

export class CommentQuery {
  @Transform(({ value }) => +value || CommentCount.Default)
  @IsNumber()
  @IsOptional()
  public limit: number = CommentCount.Default;

  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: TSortDirection = SortDirection.Desc;

  @Transform(({ value }) => +value || CommentCount.PageDefault)
  @IsOptional()
  public page: number = CommentCount.PageDefault;
}
