const request = require('supertest');
const app = require('../app');

describe('API', () => {
  test('POST /api/events logs event', async () => {
    const res = await request(app)
      .post('/api/events')
      .send({ feature: 'TestFeature', user: 'TestUser' });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /api/usage returns data', async () => {
    const res = await request(app).get('/api/usage');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/users returns data', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/accounts returns data', async () => {
    const res = await request(app).get('/api/accounts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/locations returns data', async () => {
    const res = await request(app).get('/api/locations');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
