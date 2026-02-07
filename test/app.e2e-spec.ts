import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { loginAndGetToken } from './utils/auth-helper';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let authToken: string;

  beforeEach(async () => {
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

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect('Hello World!');
  });
});
