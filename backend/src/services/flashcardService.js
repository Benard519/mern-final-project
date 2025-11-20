const OpenAI = require('openai');

let client;

const getClient = () => {
  if (!client) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY not configured');
    }
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return client;
};

const buildPrompt = (recipe) => `
You are an assistant that creates study flashcards to help someone memorize a recipe.
Return JSON formatted as {"flashcards":[{"prompt":"","answer":""},...]}.
Create 4-6 concise flashcards using ingredients, instructions, and tips.
Recipe Title: ${recipe.title}
Ingredients: ${recipe.ingredients.join(', ')}
Instructions: ${recipe.instructions}
Category: ${recipe.category}; Difficulty: ${recipe.difficulty}; Prep Time: ${recipe.prepTime} minutes.
`;

exports.generateFlashcardsFromRecipe = async (recipe) => {
  const response = await getClient().responses.create({
    model: 'gpt-4o-mini',
    input: buildPrompt(recipe),
    response_format: { type: 'json_object' },
  });

  const output = response.output?.[0]?.content?.[0]?.text || '{}';
  const parsed = JSON.parse(output);
  if (!Array.isArray(parsed.flashcards)) {
    throw new Error('Invalid flashcard response from AI');
  }
  return parsed.flashcards.slice(0, 6);
};

