const express = require('express');
const { body } = require('express-validator');
const {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  toggleLike,
  addComment,
  deleteComment,
} = require('../controllers/recipeController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getRecipes)
  .post(
    auth,
    [
      body('title').notEmpty(),
      body('ingredients').isArray({ min: 1 }),
      body('instructions').notEmpty(),
      body('category').notEmpty(),
    ],
    createRecipe
  );

router
  .route('/:id')
  .get(getRecipe)
  .put(auth, updateRecipe)
  .delete(auth, deleteRecipe);

router.post('/:id/like', auth, toggleLike);
router.post('/:id/comments', auth, [body('content').notEmpty()], addComment);
router.delete('/:id/comments/:commentId', auth, deleteComment);

module.exports = router;


