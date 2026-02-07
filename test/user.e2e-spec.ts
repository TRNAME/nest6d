import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { loginAndGetToken } from './utils/auth-helper';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    authToken = await loginAndGetToken(app, {
      username: process.env.TEST_USERNAME  || 'default_user',
      password: process.env.TEST_PASSWORD || 'default_pass',
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/user')
      .set('Authorization', `Bearer ${authToken}`) // 2. 后续请求使用 token
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('/user (POST)', () => {
    return request(app.getHttpServer())
      .post('/user')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        username: 'username',
        email: 'test@email.com',
        password: 'password',
      })
      .expect(201);
  });
});
