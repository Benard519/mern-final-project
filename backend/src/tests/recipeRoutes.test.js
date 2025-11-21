const request = require('supertest');
const app = require('../app');

const registerAndAuth = async () => {
  const res = await request(app).post('/api/auth/register').send({
    name: 'Chef Test',
    email: 'chef@example.com',
    password: 'password123',
  });
  return res.body.token;
};

describe('Recipe Routes', () => {
  it('creates and retrieves recipes with filters', async () => {
    const token = await registerAndAuth();
    await request(app)
      .post('/api/recipes')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Recipe',
        ingredients: ['eggs', 'flour'],
        instructions: 'Mix and bake',
        category: 'dessert',
        difficulty: 'easy',
        prepTime: 30,
      })
      .expect(201);

    const listRes = await request(app)
      .get('/api/recipes')
      .query({ search: 'Test', category: 'dessert' })
      .expect(200);

    expect(listRes.body.data).toHaveLength(1);
    expect(listRes.body.data[0].title).toBe('Test Recipe');
  });
});







