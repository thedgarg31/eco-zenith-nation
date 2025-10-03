const express = require('express');
const { body } = require('express-validator');
const actionController = require('../controllers/action.controller');
const authController = require('../controllers/auth.controller');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Get all actions for the logged-in user
router.get('/', actionController.getUserActions);

// Log a new action
router.post(
  '/',
  [
    body('category').isIn(['travel', 'energy', 'food', 'waste', 'shopping']),
    body('actionType').not().isEmpty(),
    body('fromOption').not().isEmpty(),
    body('toOption').not().isEmpty(),
    body('quantity').isFloat({ gt: 0 }),
  ],
  validateRequest,
  actionController.logAction
);

// Get action by ID
router.get('/:id', actionController.getAction);

// Update an action
router.patch(
  '/:id',
  [
    body('category').optional().isIn(['travel', 'energy', 'food', 'waste', 'shopping']),
    body('actionType').optional().notEmpty(),
    body('fromOption').optional().notEmpty(),
    body('toOption').optional().notEmpty(),
    body('quantity').optional().isFloat({ gt: 0 }),
  ],
  validateRequest,
  actionController.updateAction
);

// Delete an action
router.delete('/:id', actionController.deleteAction);

// Get action categories
router.get('/categories', actionController.getActionCategories);

module.exports = router;
