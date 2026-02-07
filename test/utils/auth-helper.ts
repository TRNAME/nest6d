import { INestApplication } from '@nestjs/common';
import request from 'supertest';

interface LoginResponse {
  access_token: string;
}

export async function loginAndGetToken(
  app: INestApplication,
  credentials: { username: string; password: string },
): Promise<string> {
  const res = await request(app.getHttpServer())
    .post('/auth/login')
    .send(credentials)
    .expect(200);

  const body = res.body as LoginResponse;

  // 类型守卫验证
  if (!body || typeof body.access_token !== 'string') {
    throw new Error('Login failed: invalid response format');
  }

  return body.access_token;
}
