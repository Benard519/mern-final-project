const { validationResult } = require('express-validator');
const Flashcard = require('../models/Flashcard');
const Recipe = require('../models/Recipe');
const asyncHandler = require('../utils/asyncHandler');
const { generateFlashcardsFromRecipe } = require('../services/flashcardService');

exports.generateFlashcards = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { recipeId } = req.body;
  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  const cards = await generateFlashcardsFromRecipe(recipe);
  
  // Update existing flashcard or create new one
  const flashcardDoc = await Flashcard.findOneAndUpdate(
    { recipe: recipeId },
    {
      recipe: recipeId,
      createdBy: req.user._id,
      cards,
    },
    {
      new: true,
      upsert: true,
    }
  );

  res.status(201).json(flashcardDoc);
});

exports.getFlashcardsByRecipe = asyncHandler(async (req, res) => {
  const flashcards = await Flashcard.findOne({ recipe: req.params.recipeId });
  if (!flashcards) {
    return res.status(404).json({ message: 'No flashcards found' });
  }
  res.json(flashcards);
});





