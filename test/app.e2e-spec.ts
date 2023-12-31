import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/name/:name (GET)', () => {
    const name = 'geunho';
    return request(app.getHttpServer())
      .get(`/name/${name}`)
      .expect(200)
      .expect(`${name} hello`);
  });

  describe('Board Contoller', () => {
    it('게시글 가져오기 (GET)', () => {
      return request(app.getHttpServer()).get('/boards').expect(200);
    });
  });

  describe('User Contoller', () => {
    it('로그인', () => {
      return request(app.getHttpServer())
        .post(`/login`)
        .send({
          username: 'shindoo12',
          password: 'kingking',
        })
        .expect(201);
    });
  });
});
