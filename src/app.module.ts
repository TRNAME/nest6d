/**
 * @author TRNAME (https://github.com/TRNAME)
 * @license MIT
 * @copyright 2026 TRNAME
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './roles/roles.guard';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug', //总
        serializers: { req: () => undefined, res: () => undefined }, // 精简req、res
        transport: {
          targets: [
            {
              target: 'pino-pretty', //写控制台
              options: { singleLine: true, colorize: true },
            },
            {
              target: 'pino/file', //写磁盘
              level: 'info', //指定
              options: {
                singleLine: true,
                colorize: true,
                destination: 'logs/app.log',
                mkdir: true, // 目录不存在就自动建
              },
            },
          ],
        },
      },
    }),
    UserModule,
    AuthModule,
    // 全局加载环境变量，isGlobal=true确保所有模块都能直接读取process.env
    ConfigModule.forRoot({
      isGlobal: true,
      // 本地读取 .env，生产环境 Railway 已注入，忽略 .env
      envFilePath: process.env.RAILWAY_ENVIRONMENT ? undefined : '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST!,
        port: parseInt(process.env.DB_PORT!, 10),
        username: process.env.DB_USER!,
        password: process.env.DB_PASS!,
        database: process.env.DB_NAME!,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV === 'development', //自动建表
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService, // ① 普通服务，供注入
    { provide: APP_GUARD, useClass: JwtAuthGuard }, // ③ 把守卫设为全局默认
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
