const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI;

const getClient = () => {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
};

const buildPrompt = (recipe) => `
You are an assistant that creates study flashcards to help someone memorize a recipe.
Return ONLY valid JSON formatted as {"flashcards":[{"prompt":"","answer":""},...]}.
Create 4-6 concise flashcards using ingredients, instructions, and tips.
Recipe Title: ${recipe.title}
Ingredients: ${recipe.ingredients.join(', ')}
Instructions: ${recipe.instructions}
Category: ${recipe.category}; Difficulty: ${recipe.difficulty}; Prep Time: ${recipe.prepTime} minutes.
`;

exports.generateFlashcardsFromRecipe = async (recipe) => {
  const model = getClient().getGenerativeModel({ model: 'gemini-1.5-flash' });
  
  const prompt = buildPrompt(recipe);
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  // Extract JSON from response (handle markdown code blocks if present)
  let jsonText = text.trim();
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/```\n?/g, '').trim();
  }

  const parsed = JSON.parse(jsonText);
  if (!Array.isArray(parsed.flashcards)) {
    throw new Error('Invalid flashcard response from AI');
  }
  return parsed.flashcards.slice(0, 6);
};

