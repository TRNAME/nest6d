/**
 * @author TRNAME (https://github.com/TRNAME)
 * @license MIT
 * @copyright 2026 TRNAME
 */

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ← 把实体注册给当前模块
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
