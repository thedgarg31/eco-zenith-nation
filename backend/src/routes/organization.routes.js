const express = require('express');
const { body } = require('express-validator');
const organizationController = require('../controllers/organization.controller');
const authController = require('../controllers/auth.controller');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

// Public routes
router.get('/', organizationController.getAllOrganizations);
router.get('/:id', organizationController.getOrganization);

// Protected routes (require authentication)
router.use(authController.protect);

// Organization management
router.post(
  '/',
  [
    body('name', 'Organization name is required').not().isEmpty(),
    body('logoUrl').optional().isURL(),
    body('targetCo2').optional().isFloat({ min: 0 }),
    body('targetDeadline').optional().isISO8601(),
  ],
  validateRequest,
  organizationController.createOrganization
);

router.patch(
  '/:id',
  [
    body('name').optional().notEmpty(),
    body('logoUrl').optional().isURL(),
    body('targetCo2').optional().isFloat({ min: 0 }),
    body('targetDeadline').optional().isISO8601(),
  ],
  validateRequest,
  organizationController.updateOrganization
);

router.delete('/:id', organizationController.deleteOrganization);

// Organization members
router.get('/:id/members', organizationController.getOrganizationMembers);
router.post('/:id/members', organizationController.addOrganizationMember);
router.delete('/:id/members/:userId', organizationController.removeOrganizationMember);

// Organization stats
router.get('/:id/stats', organizationController.getOrganizationStats);

// Organization leaderboard
router.get('/:id/leaderboard', organizationController.getOrganizationLeaderboard);

module.exports = router;
