/**
 * @author TRNAME (https://github.com/TRNAME)
 * @license MIT
 * @copyright 2026 TRNAME
 */

import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/roles.enum';

export const ROLES_KEY = 'role';
export const Roles = (...role: Role[]) => SetMetadata(ROLES_KEY, role);
