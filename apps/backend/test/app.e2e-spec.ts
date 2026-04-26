import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import type { Server } from 'node:http';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Messages (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/messages (GET)', () => {
    const httpServer = app.getHttpServer() as Server;

    return request(httpServer).get('/messages').expect(200);
  });

  afterEach(async () => {
    await app.close();
  });
});
