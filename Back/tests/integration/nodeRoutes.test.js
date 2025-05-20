import request from 'supertest';
import app from '../../src/app.js';

describe('GET /api/nodes', () => {
  it('devuelve 200 y arreglo', async () => {
    const res = await request(app).get('/api/nodes');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
