const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Get current user profile
router.get('/me', userController.getMe);

// Update current user profile
router.patch(
  '/me',
  [
    body('fullName').optional().trim().notEmpty(),
    body('avatarUrl').optional().trim().isURL(),
  ],
  validateRequest,
  userController.updateMe
);

// Delete current user account
router.delete('/me', userController.deleteMe);

// Change password
router.patch(
  '/change-password',
  [
    body('currentPassword').notEmpty(),
    body('newPassword').isLength({ min: 6 }),
    body('passwordConfirm').custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  ],
  validateRequest,
  userController.changePassword
);

// Get user's actions
router.get('/me/actions', userController.getMyActions);

// Get user's achievements
router.get('/me/achievements', userController.getMyAchievements);

// Get user's challenges
router.get('/me/challenges', userController.getMyChallenges);

// Get user's organization
router.get('/me/organization', userController.getMyOrganization);

// Join an organization
router.post('/me/organization/join', 
  [
    body('organizationId').notEmpty(),
  ],
  validateRequest,
  userController.joinOrganization
);

// Leave current organization
router.post('/me/organization/leave', userController.leaveOrganization);

// Admin routes (restricted to admin users)
router.use(authController.restrictTo('admin'));

// Get all users (admin only)
router.get('/', userController.getAllUsers);

// Get user by ID (admin only)
router.get('/:id', userController.getUser);

// Update any user (admin only)
router.patch('/:id', userController.updateUser);

// Delete user (admin only)
router.delete('/:id', userController.deleteUser);

module.exports = router;
