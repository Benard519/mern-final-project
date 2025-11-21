const express = require('express');
const { body } = require('express-validator');
const {
  generateFlashcards,
  getFlashcardsByRecipe,
} = require('../controllers/flashcardController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post(
  '/',
  auth,
  [body('recipeId').isMongoId().withMessage('Valid recipeId required')],
  generateFlashcards
);

router.get('/:recipeId', auth, getFlashcardsByRecipe);

module.exports = router;







