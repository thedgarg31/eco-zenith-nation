const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const { createSendToken } = require('./auth.controller');

const prisma = new PrismaClient();

// Helper function to filter object fields
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        avatarUrl: true,
        level: true,
        coolPoints: true,
        totalCo2Saved: true,
        organizationId: true,
        role: true, // Include role in the response
        createdAt: true,
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while fetching user data'
    });
  }
};

exports.updateMe = async (req, res, next) => {
  try {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return res.status(400).json({
        status: 'error',
        message: 'This route is not for password updates. Please use /updateMyPassword.'
      });
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'fullName', 'avatarUrl');

    // 3) Update user document
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: filteredBody,
      select: {
        id: true,
        email: true,
        fullName: true,
        avatarUrl: true,
        level: true,
        coolPoints: true,
        totalCo2Saved: true,
        organizationId: true,
        role: true, // Include role in the response
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error('Update me error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while updating user data'
    });
  }
};

exports.deleteMe = async (req, res, next) => {
  try {
    await prisma.user.update({
      where: { id: req.user.id },
      data: { active: false },
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    console.error('Delete me error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while deleting user'
    });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    // 1) Get user from collection
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    // 2) Check if POSTed current password is correct
    if (!(await bcrypt.compare(req.body.currentPassword, user.passwordHash))) {
      return res.status(401).json({
        status: 'error',
        message: 'Your current password is wrong.'
      });
    }

    // 3) If so, update password
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);

    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        passwordHash: hashedPassword,
      },
    });

    // 4) Log user in, send JWT
    createSendToken(user, 200, res);
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while changing password'
    });
  }
};

exports.getMyActions = async (req, res, next) => {
  try {
    const actions = await prisma.action.findMany({
      where: { userId: req.user.id },
      orderBy: { datePerformed: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      results: actions.length,
      data: {
        actions,
      },
    });
  } catch (error) {
    console.error('Get actions error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while fetching actions'
    });
  }
};

exports.getMyAchievements = async (req, res, next) => {
  try {
    const achievements = await prisma.userAchievement.findMany({
      where: { userId: req.user.id },
      include: {
        achievement: true,
      },
      orderBy: { earnedAt: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      results: achievements.length,
      data: {
        achievements: achievements.map(ua => ua.achievement),
      },
    });
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while fetching achievements'
    });
  }
};

exports.getMyChallenges = async (req, res, next) => {
  try {
    const userChallenges = await prisma.userChallenge.findMany({
      where: { userId: req.user.id },
      include: {
        challenge: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      results: userChallenges.length,
      data: {
        challenges: userChallenges.map(uc => ({
          ...uc.challenge,
          progress: uc.progress,
          completed: uc.completed,
          completedAt: uc.completedAt,
        })),
      },
    });
  } catch (error) {
    console.error('Get challenges error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while fetching challenges'
    });
  }
};

exports.getMyOrganization = async (req, res, next) => {
  try {
    if (!req.user.organizationId) {
      return res.status(200).json({
        status: 'success',
        data: {
          organization: null,
        },
      });
    }

    const organization = await prisma.organization.findUnique({
      where: { id: req.user.organizationId },
    });

    res.status(200).json({
      status: 'success',
      data: {
        organization,
      },
    });
  } catch (error) {
    console.error('Get organization error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while fetching organization'
    });
  }
};

exports.joinOrganization = async (req, res, next) => {
  try {
    // Check if organization exists
    const organization = await prisma.organization.findUnique({
      where: { id: req.body.organizationId },
    });

    if (!organization) {
      return res.status(404).json({
        status: 'error',
        message: 'No organization found with that ID'
      });
    }

    // Update user's organization
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        organizationId: req.body.organizationId,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        organizationId: true,
        role: true, // Include role in the response
      },
    });

    // Update organization's total CO2 saved and points
    await prisma.organization.update({
      where: { id: req.body.organizationId },
      data: {
        totalCo2Saved: { increment: req.user.totalCo2Saved || 0 },
        totalCoolPoints: { increment: req.user.coolPoints || 0 },
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error('Join organization error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while joining organization'
    });
  }
};

exports.leaveOrganization = async (req, res, next) => {
  try {
    if (!req.user.organizationId) {
      return res.status(400).json({
        status: 'error',
        message: 'You are not a member of any organization'
      });
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        organizationId: null,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        organizationId: true,
        role: true, // Include role in the response
      },
    });

    // Update organization's total CO2 saved and points
    await prisma.organization.update({
      where: { id: req.user.organizationId },
      data: {
        totalCo2Saved: { decrement: req.user.totalCo2Saved || 0 },
        totalCoolPoints: { decrement: req.user.coolPoints || 0 },
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error('Leave organization error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while leaving organization'
    });
  }
};

// Admin-only functions
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        avatarUrl: true,
        level: true,
        coolPoints: true,
        totalCo2Saved: true,
        organizationId: true,
        role: true, // Include role in the response
        createdAt: true,
      },
    });

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while fetching users'
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        email: true,
        fullName: true,
        avatarUrl: true,
        level: true,
        coolPoints: true,
        totalCo2Saved: true,
        organizationId: true,
        role: true, // Include role in the response
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'No user found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while fetching user'
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    // Filter out unwanted fields
    const filteredBody = filterObj(
      req.body,
      'email',
      'fullName',
      'avatarUrl',
      'level',
      'coolPoints',
      'totalCo2Saved',
      'organizationId',
      'role' // Allow updating role
    );

    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: filteredBody,
      select: {
        id: true,
        email: true,
        fullName: true,
        avatarUrl: true,
        level: true,
        coolPoints: true,
        totalCo2Saved: true,
        organizationId: true,
        role: true,
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while updating user'
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id },
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error while deleting user'
    });
  }
};