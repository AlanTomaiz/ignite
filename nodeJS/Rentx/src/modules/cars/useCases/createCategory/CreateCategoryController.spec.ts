import request from 'supertest';
import { Connection, createConnection } from 'typeorm';

import { app } from '@shared/infra/http/app';

let conn: Connection;
let token: string;
describe('Create category', () => {
  beforeAll(async () => {
    conn = await createConnection();
    const { body } = await request(app).post('/session').send({
      email: 'admin@rentx.com.br',
      pass: '123456',
    });

    token = body.token;
  });

  afterAll(async () => {
    await conn.close();
  });

  it('Shold be able create a new category', async () => {
    const response = await request(app)
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Categorie Test',
        description: 'Categorie Test Jest',
      });

    expect(response.status).toEqual(201);
  });
});
