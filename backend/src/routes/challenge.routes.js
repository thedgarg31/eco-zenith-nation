const express = require('express');
const { body } = require('express-validator');
const challengeController = require('../controllers/challenge.controller');
const authController = require('../controllers/auth.controller');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// Public routes
router.get('/', challengeController.getAllChallenges);
router.get('/:id', challengeController.getChallenge);

// Protected routes (require authentication)
router.use(authController.protect);

// Challenge participation
router.post('/:id/join', challengeController.joinChallenge);
router.post('/:id/leave', challengeController.leaveChallenge);
router.get('/me/active', challengeController.getMyActiveChallenges);
router.get('/me/completed', challengeController.getMyCompletedChallenges);

// Admin routes (restricted to admin users)
router.use(authController.restrictTo('admin'));

// Challenge management
router.post(
  '/',
  [
    body('title', 'Title is required').not().isEmpty(),
    body('description', 'Description is required').not().isEmpty(),
    body('category', 'Category is required').not().isEmpty(),
    body('startDate', 'Start date is required').isISO8601(),
    body('endDate', 'End date is required').isISO8601(),
    body('targetValue', 'Target value is required and must be a positive number').isFloat({ min: 0 }),
    body('rewardPoints', 'Reward points is required and must be a positive integer').isInt({ min: 0 }),
    body('imageUrl').optional().isURL(),
  ],
  validateRequest,
  challengeController.createChallenge
);

router.patch(
  '/:id',
  [
    body('title').optional().notEmpty(),
    body('description').optional().notEmpty(),
    body('category').optional().notEmpty(),
    body('startDate').optional().isISO8601(),
    body('endDate').optional().isISO8601(),
    body('targetValue').optional().isFloat({ min: 0 }),
    body('rewardPoints').optional().isInt({ min: 0 }),
    body('imageUrl').optional().isURL(),
  ],
  validateRequest,
  challengeController.updateChallenge
);

router.delete('/:id', challengeController.deleteChallenge);

// Challenge participants
router.get('/:id/participants', challengeController.getChallengeParticipants);

module.exports = router;
