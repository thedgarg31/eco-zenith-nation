const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    body('fullName', 'Name is required').not().isEmpty(),
  ],
  validateRequest,
  authController.register
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  validateRequest,
  authController.login
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', authController.protect, authController.getMe);

// @route   POST /api/auth/forgot-password
// @desc    Forgot password
// @access  Public
router.post(
  '/forgot-password',
  [body('email', 'Please include a valid email').isEmail()],
  validateRequest,
  authController.forgotPassword
);

// @route   PUT /api/auth/reset-password/:token
// @desc    Reset password
// @access  Public
router.put(
  '/reset-password/:token',
  [
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    body('passwordConfirm', 'Please confirm your password').exists(),
  ],
  validateRequest,
  authController.resetPassword
);

module.exports = router;
