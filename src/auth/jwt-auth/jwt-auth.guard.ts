/**
 * @author TRNAME (https://github.com/TRNAME)
 * @license MIT
 * @copyright 2026 TRNAME
 */

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import type { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { JwtPayload } from '../../types/express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector, // ① 注入 Reflector
    @InjectPinoLogger()
    private readonly logger: PinoLogger,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), // 路由
      context.getClass(), // 控制器
    ]);
    this.logger.info(`是否放行：${isPublic}`);
    if (isPublic) return true; // ② 贴了 @Public() 直接放行

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) throw new UnauthorizedException();

    try {
      // 强制挂到 req.user，先 any 绕过 TS
      request.user = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: jwtConstants.secret,
      });
    } catch (e) {
      this.logger.error('JWT error:' + e);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractToken(req: Request): string | undefined {
    this.logger.info('登录headers：' + JSON.stringify(req.headers));
    const auth = req.headers?.authorization ?? ''; // 直接属性访问
    const [type, token] = auth.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
