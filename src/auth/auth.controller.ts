/**
 * @author TRNAME (https://github.com/TRNAME)
 * @license MIT
 * @copyright 2026 TRNAME
 */

import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorator/public.decorator';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectPinoLogger()
    private readonly logger: PinoLogger,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    this.logger.info('登录中。。。');
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
