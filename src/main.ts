/**
 * @author TRNAME (https://github.com/TRNAME)
 * @license MIT
 * @copyright 2026 TRNAME
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('========================================');
  console.log('  nest6d Server');
  console.log('  Author: TRNAME');
  console.log('  GitHub: https://github.com/TRNAME/nest6d');
  console.log('  License: MIT © 2026 TRNAME');
  console.log('========================================');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 1. 先 build
  const config = new DocumentBuilder()
    .setTitle('nest6d')
    .setDescription('by TRNAME (https://github.com/TRNAME)')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer', //已知锁就是 Bearer 方案，自动拼"Bearer "前缀
        bearerFormat: 'JWT', // 可写也可省略
        name: 'Authorization',
        in: 'header',
      },
      'access-token', // 这个名称必须给，后面要引用) // ← 这里把锁按钮加上
    )
    .build();

  // 2. 再 create document
  const document = SwaggerModule.createDocument(app, config);

  // 3. 最后挂载路由
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap().then().catch(console.error);
