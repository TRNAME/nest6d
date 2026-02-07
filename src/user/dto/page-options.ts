/**
 * @author TRNAME (https://github.com/TRNAME)
 * @license MIT
 * @copyright 2026 TRNAME
 */

import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptionsDto {
  @Type(() => Number)
  @IsNumber()
  limit: number = 10;

  @Type(() => Number)
  @IsNumber()
  page: number = 0;

  @IsOptional() //写了值就要符合格式
  @IsString()
  search?: string; //模糊搜索关键字

  @IsOptional()
  @IsString()
  orderBy?: string; //排序字段

  @IsOptional()
  @IsEnum(Order) // ← 只能 ASC 或 DESC
  order?: Order = Order.DESC; // 默认值：降序
}
