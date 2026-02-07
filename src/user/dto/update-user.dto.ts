/**
 * @author TRNAME (https://github.com/TRNAME)
 * @license MIT
 * @copyright 2026 TRNAME
 */

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
