import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // beforeAll 과 beforeEach의 차이 = 매번 app을 생성하지 않는다.
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    // 테스팅환경도 실제환경이랑 맞춰줘야한다.
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('welcome to my Movie API');
  });

  describe('/movies', () => {
    it('/movies (GET)', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('/movies (POST)', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: '남자가 사랑할 때',
          year: 2023,
          genres: ['test'],
        })
        .expect(201);
    });

    it('/movies (POST) 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: '남자가 사랑할 때',
          year: 2023,
          genres: ['test'],
          other: 'thing',
        })
        .expect(400);
    });

    it('/movies (DELETE)', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('get 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('get 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });
    it('patch', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'what the..' })
        .expect(200);
    });
    it('delete', () => {
      return request(app.getHttpServer()).delete('/movies/999').expect(404);
    });
  });
});
