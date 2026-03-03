  const request = require('supertest');
const app = require('./app.js'); // Aapki main express file (jahan app.get/post hain)

describe('API Testing', () => {
  test('Check All Posts API', async () => {
    const res = await request(app).get('/showAll-post');
    expect(res.statusCode).toBe(200); // Check karo status 200 hai ya nahi
  });
});
 

