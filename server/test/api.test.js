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
});
