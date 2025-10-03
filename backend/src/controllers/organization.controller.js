const { PrismaClient } = require('@prisma/client');
const AppError = require('../utils/appError');

const prisma = new PrismaClient();

// Helper function to check if user is admin of the organization
const isOrganizationAdmin = async (userId, organizationId) => {
  // In a real app, you might have a separate table for organization admins
  // For now, we'll consider the organization creator as the admin
  const organization = await prisma.organization.findUnique({
    where: { id: organizationId },
    select: { userId: true },
  });
  
  return organization && organization.userId === userId;
};

exports.getAllOrganizations = async (req, res, next) => {
  try {
    const organizations = await prisma.organization.findMany({
      select: {
        id: true,
        name: true,
        logoUrl: true,
        totalCo2Saved: true,
        totalCoolPoints: true,
        targetCo2: true,
        targetDeadline: true,
        _count: {
          select: { users: true },
        },
      },
      orderBy: { totalCo2Saved: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      results: organizations.length,
      data: {
        organizations,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getOrganization = async (req, res, next) => {
  try {
    const organization = await prisma.organization.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        name: true,
        logoUrl: true,
        totalCo2Saved: true,
        totalCoolPoints: true,
        targetCo2: true,
        targetDeadline: true,
        createdAt: true,
        _count: {
          select: { users: true },
        },
      },
    });

    if (!organization) {
      return next(new AppError('No organization found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        organization,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.createOrganization = async (req, res, next) => {
  try {
    const { name, logoUrl, targetCo2, targetDeadline } = req.body;

    const organization = await prisma.organization.create({
      data: {
        name,
        logoUrl,
        targetCo2: targetCo2 ? parseFloat(targetCo2) : null,
        targetDeadline: targetDeadline ? new Date(targetDeadline) : null,
        userId: req.user.id, // Set the creator as the admin
      },
    });

    // Add the creator as a member
    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        organizationId: organization.id,
      },
    });

    res.status(201).json({
      status: 'success',
      data: {
        organization,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateOrganization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, logoUrl, targetCo2, targetDeadline } = req.body;

    // Check if user is admin of the organization
    const isAdmin = await isOrganizationAdmin(req.user.id, id);
    if (!isAdmin) {
      return next(new AppError('Not authorized to update this organization', 403));
    }

    const updatedOrganization = await prisma.organization.update({
      where: { id },
      data: {
        name,
        logoUrl,
        targetCo2: targetCo2 !== undefined ? parseFloat(targetCo2) : undefined,
        targetDeadline: targetDeadline ? new Date(targetDeadline) : undefined,
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        organization: updatedOrganization,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteOrganization = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if user is admin of the organization
    const isAdmin = await isOrganizationAdmin(req.user.id, id);
    if (!isAdmin) {
      return next(new AppError('Not authorized to delete this organization', 403));
    }

    // Remove all users from the organization
    await prisma.user.updateMany({
      where: { organizationId: id },
      data: { organizationId: null },
    });

    // Delete the organization
    await prisma.organization.delete({
      where: { id },
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.getOrganizationMembers = async (req, res, next) => {
  try {
    const { id } = req.params;

    const members = await prisma.user.findMany({
      where: { organizationId: id },
      select: {
        id: true,
        email: true,
        fullName: true,
        avatarUrl: true,
        level: true,
        coolPoints: true,
        totalCo2Saved: true,
      },
      orderBy: { totalCo2Saved: 'desc' },
    });

    res.status(200).json({
      status: 'success',
      results: members.length,
      data: {
        members,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.addOrganizationMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (!email) {
      return next(new AppError('Please provide an email address', 400));
    }

    // Check if user is admin of the organization
    const isAdmin = await isOrganizationAdmin(req.user.id, id);
    if (!isAdmin) {
      return next(new AppError('Not authorized to add members to this organization', 403));
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return next(new AppError('No user found with that email', 404));
    }

    // Check if user is already in an organization
    if (user.organizationId) {
      return next(new AppError('User is already a member of another organization', 400));
    }

    // Add user to organization
    await prisma.user.update({
      where: { id: user.id },
      data: { organizationId: id },
    });

    // Update organization stats
    await prisma.organization.update({
      where: { id },
      data: {
        totalCo2Saved: { increment: user.totalCo2Saved || 0 },
        totalCoolPoints: { increment: user.coolPoints || 0 },
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'User added to organization successfully',
    });
  } catch (error) {
    next(error);
  }
};

exports.removeOrganizationMember = async (req, res, next) => {
  try {
    const { id, userId } = req.params;

    // Check if user is admin of the organization or the user themselves
    const isAdmin = await isOrganizationAdmin(req.user.id, id);
    if (!isAdmin && req.user.id !== userId) {
      return next(new AppError('Not authorized to remove this member', 403));
    }

    // Get user's CO2 and points before removing
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { totalCo2Saved: true, coolPoints: true },
    });

    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    // Remove user from organization
    await prisma.user.update({
      where: { id: userId },
      data: { organizationId: null },
    });

    // Update organization stats
    await prisma.organization.update({
      where: { id },
      data: {
        totalCo2Saved: { decrement: user.totalCo2Saved || 0 },
        totalCoolPoints: { decrement: user.coolPoints || 0 },
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'User removed from organization successfully',
    });
  } catch (error) {
    next(error);
  }
};

exports.getOrganizationStats = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Get organization with member count
    const organization = await prisma.organization.findUnique({
      where: { id },
      select: {
        totalCo2Saved: true,
        totalCoolPoints: true,
        targetCo2: true,
        targetDeadline: true,
        _count: {
          select: { users: true },
        },
      },
    });

    if (!organization) {
      return next(new AppError('No organization found with that ID', 404));
    }

    // Get actions by category
    const actionsByCategory = await prisma.action.groupBy({
      by: ['category'],
      where: {
        user: {
          organizationId: id,
        },
      },
      _sum: {
        co2Saved: true,
      },
    });

    // Format category data
    const categories = actionsByCategory.map((item) => ({
      category: item.category,
      co2Saved: item._sum.co2Saved || 0,
    }));

    // Calculate progress towards target
    const progress = organization.targetCo2
      ? (organization.totalCo2Saved / organization.targetCo2) * 100
      : 0;

    res.status(200).json({
      status: 'success',
      data: {
        stats: {
          totalMembers: organization._count.users,
          totalCo2Saved: organization.totalCo2Saved,
          totalCoolPoints: organization.totalCoolPoints,
          targetCo2: organization.targetCo2,
          targetDeadline: organization.targetDeadline,
          progress: Math.min(100, Math.round(progress * 100) / 100), // Cap at 100%
          categories,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getOrganizationLeaderboard = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Get top 10 members by CO2 saved
    const members = await prisma.user.findMany({
      where: { organizationId: id },
      select: {
        id: true,
        fullName: true,
        avatarUrl: true,
        totalCo2Saved: true,
        coolPoints: true,
      },
      orderBy: { totalCo2Saved: 'desc' },
      take: 10,
    });

    // Add rank to each member
    const rankedMembers = members.map((member, index) => ({
      ...member,
      rank: index + 1,
    }));

    res.status(200).json({
      status: 'success',
      results: rankedMembers.length,
      data: {
        leaderboard: rankedMembers,
      },
    });
  } catch (error) {
    next(error);
  }
};
