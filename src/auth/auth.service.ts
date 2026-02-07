/**
 * @author TRNAME (https://github.com/TRNAME)
 * @license MIT
 * @copyright 2026 TRNAME
 */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectPinoLogger()
    private readonly logger: PinoLogger,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    this.logger.info(`申请登录用户为：${username}`);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.id, role: user.role };
    this.logger.info(`${username} 登录成功`);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
