const express = require('express');
const { body } = require('express-validator');
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
} = require('../controllers/authController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Min 6 characters'),
  ],
  registerUser
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').notEmpty()],
  loginUser
);

router.get('/me', auth, getProfile);
router.put('/me', auth, updateProfile);

module.exports = router;







