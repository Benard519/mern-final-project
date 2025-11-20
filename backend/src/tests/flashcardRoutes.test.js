jest.mock('openai', () =>
  jest.fn().mockImplementation(() => ({
    responses: {
      create: jest.fn().mockResolvedValue({
        output: [
          {
            content: [
              {
                text: JSON.stringify({
                  flashcards: [
                    { prompt: 'What is the main ingredient?', answer: 'Eggs' },
                  ],
                }),
              },
            ],
          },
        ],
      }),
    },
  }))
);

const request = require('supertest');
const app = require('../app');

const registerUser = async () => {
  const res = await request(app).post('/api/auth/register').send({
    name: 'Flash Tester',
    email: 'flash@example.com',
    password: 'password123',
  });
  return res.body.token;
};

const createRecipe = async (token) => {
  const res = await request(app)
    .post('/api/recipes')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'Flash Recipe',
      ingredients: ['eggs', 'milk'],
      instructions: 'Cook slowly',
      category: 'breakfast',
      difficulty: 'easy',
      prepTime: 10,
    });
  return res.body._id;
};

describe('Flashcard Routes', () => {
  it('generates flashcards for a recipe', async () => {
    const token = await registerUser();
    const recipeId = await createRecipe(token);

    const genRes = await request(app)
      .post('/api/flashcards')
      .set('Authorization', `Bearer ${token}`)
      .send({ recipeId })
      .expect(201);

    expect(genRes.body.cards).toHaveLength(1);

    const fetchRes = await request(app)
      .get(`/api/flashcards/${recipeId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(fetchRes.body.cards[0].prompt).toContain('main ingredient');
  });
});


