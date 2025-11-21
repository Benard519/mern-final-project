const { validationResult } = require('express-validator');
const Recipe = require('../models/Recipe');
const asyncHandler = require('../utils/asyncHandler');

exports.createRecipe = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const recipe = await Recipe.create({
    ...req.body,
    user: req.user._id,
  });
  res.status(201).json(recipe);
});

exports.getRecipes = asyncHandler(async (req, res) => {
  const {
    search,
    category,
    difficulty,
    maxPrepTime,
    user: authorId,
    page = 1,
    limit = 10,
  } = req.query;

  const query = {};
  if (category) query.category = category;
  if (difficulty) query.difficulty = difficulty;
  if (maxPrepTime) query.prepTime = { $lte: Number(maxPrepTime) };
  if (authorId) query.user = authorId;
  
  // Use regex search as fallback if text index isn't available
  if (search) {
    const searchRegex = new RegExp(search, 'i');
    query.$or = [
      { title: searchRegex },
      { category: searchRegex },
      { ingredients: { $in: [searchRegex] } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [recipes, total] = await Promise.all([
    Recipe.find(query)
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Recipe.countDocuments(query),
  ]);

  res.json({
    data: recipes,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    },
  });
});

exports.getRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate(
    'user likes comments.user',
    'name'
  );
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  res.json(recipe);
});

exports.updateRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  if (recipe.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  Object.assign(recipe, req.body);
  const updated = await recipe.save();
  res.json(updated);
});

exports.deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }
  if (recipe.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }
  await recipe.deleteOne();
  res.json({ message: 'Recipe removed' });
});

exports.toggleLike = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  const alreadyLiked = recipe.likes.some(
    (like) => like.toString() === req.user._id.toString()
  );
  if (alreadyLiked) {
    recipe.likes = recipe.likes.filter(
      (like) => like.toString() !== req.user._id.toString()
    );
  } else {
    recipe.likes.push(req.user._id);
  }
  await recipe.save();
  res.json({ likes: recipe.likes.length });
});

exports.addComment = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  recipe.comments.unshift({
    user: req.user._id,
    content: req.body.content,
  });

  await recipe.save();
  res.status(201).json(recipe.comments[0]);
});

exports.deleteComment = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: 'Recipe not found' });
  }

  const comment = recipe.comments.id(req.params.commentId);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  if (comment.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  comment.remove();
  await recipe.save();
  res.json({ message: 'Comment removed' });
});


