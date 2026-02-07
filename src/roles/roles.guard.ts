/**
 * @author TRNAME (https://github.com/TRNAME)
 * @license MIT
 * @copyright 2026 TRNAME
 */

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './enums/roles.enum';
import { ROLES_KEY } from './decorator/roles.decorator';
import type { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user; //token
    return requiredRoles.some((role) => user?.role?.includes(role));
  }
}
