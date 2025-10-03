const express = require('express');
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Restrict all routes to admin users only
router.use(authController.restrictTo('admin'));

// Admin routes for user management
router.route('/users')
  .get(userController.getAllUsers);

router.route('/users/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;