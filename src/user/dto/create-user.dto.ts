/**
 * @author TRNAME (https://github.com/TRNAME)
 * @license MIT
 * @copyright 2026 TRNAME
 */

import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString() username: string;
  @IsEmail() email: string;
  @MinLength(6) password: string;
}
