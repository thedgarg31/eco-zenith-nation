const { PrismaClient } = require('@prisma/client');
const AppError = require('../utils/appError');

const prisma = new PrismaClient();

// Helper function to check if a challenge is active
const isChallengeActive = (startDate, endDate) => {
  const now = new Date();
  return now >= new Date(startDate) && now <= new Date(endDate);
};

// Helper function to calculate challenge progress
const calculateChallengeProgress = (userChallenge, challenge) => {
  // In a real app, you would calculate progress based on user's actions
  // For now, we'll return the stored progress
  return {
    ...userChallenge,
    progress: userChallenge.progress || 0,
    target: challenge.targetValue,
    progressPercentage: Math.min(
      100,
      Math.round(((userChallenge.progress || 0) / challenge.targetValue) * 100)
    ),
    isCompleted: userChallenge.completed,
    completedAt: userChallenge.completedAt,
  };
};

exports.getAllChallenges = async (req, res, next) => {
  try {
    const { status } = req.query;
    let where = {};
    const now = new Date();

    if (status === 'active') {
      where = {
        startDate: { lte: now },
        endDate: { gte: now },
      };
    } else if (status === 'upcoming') {
      where = {
        startDate: { gt: now },
      };
    } else if (status === 'past') {
      where = {
        endDate: { lt: now },
      };
    }

    const challenges = await prisma.challenge.findMany({
      where,
      orderBy: { startDate: 'asc' },
      include: {
        _count: {
          select: { userChallenges: true },
        },
      },
    });

    // Add status to each challenge
    const challengesWithStatus = challenges.map((challenge) => ({
      ...challenge,
      status: isChallengeActive(challenge.startDate, challenge.endDate)
        ? 'active'
        : new Date() < new Date(challenge.startDate)
        ? 'upcoming'
        : 'past',
      participants: challenge._count.userChallenges,
    }));

    res.status(200).json({
      status: 'success',
      results: challengesWithStatus.length,
      data: {
        challenges: challengesWithStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getChallenge = async (req, res, next) => {
  try {
    const { id } = req.params;

    const challenge = await prisma.challenge.findUnique({
      where: { id },
      include: {
        _count: {
          select: { userChallenges: true },
        },
      },
    });

    if (!challenge) {
      return next(new AppError('No challenge found with that ID', 404));
    }

    // Add status to challenge
    const challengeWithStatus = {
      ...challenge,
      status: isChallengeActive(challenge.startDate, challenge.endDate)
        ? 'active'
        : new Date() < new Date(challenge.startDate)
        ? 'upcoming'
        : 'past',
      participants: challenge._count.userChallenges,
    };

    // If user is logged in, include their participation status
    if (req.user) {
      const userChallenge = await prisma.userChallenge.findFirst({
        where: {
          userId: req.user.id,
          challengeId: id,
        },
      });

      if (userChallenge) {
        challengeWithStatus.userStatus = calculateChallengeProgress(
          userChallenge,
          challenge
        );
      }
    }

    res.status(200).json({
      status: 'success',
      data: {
        challenge: challengeWithStatus,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.joinChallenge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if challenge exists and is active
    const challenge = await prisma.challenge.findUnique({
      where: { id },
    });

    if (!challenge) {
      return next(new AppError('No challenge found with that ID', 404));
    }

    if (!isChallengeActive(challenge.startDate, challenge.endDate)) {
      return next(new AppError('This challenge is not currently active', 400));
    }

    // Check if user is already participating
    const existingParticipation = await prisma.userChallenge.findFirst({
      where: {
        userId,
        challengeId: id,
      },
    });

    if (existingParticipation) {
      return next(new AppError('You are already participating in this challenge', 400));
    }

    // Add user to challenge
    await prisma.userChallenge.create({
      data: {
        userId,
        challengeId: id,
        progress: 0,
        completed: false,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Successfully joined the challenge',
    });
  } catch (error) {
    next(error);
  }
};

exports.leaveChallenge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if user is participating in the challenge
    const participation = await prisma.userChallenge.findFirst({
      where: {
        userId,
        challengeId: id,
      },
    });

    if (!participation) {
      return next(new AppError('You are not participating in this challenge', 400));
    }

    // Remove user from challenge
    await prisma.userChallenge.delete({
      where: {
        id: participation.id,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Successfully left the challenge',
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyActiveChallenges = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    const userChallenges = await prisma.userChallenge.findMany({
      where: {
        userId,
        challenge: {
          endDate: { gte: now },
        },
      },
      include: {
        challenge: true,
      },
      orderBy: {
        challenge: {
          endDate: 'asc',
        },
      },
    });

    // Format response with progress
    const challengesWithProgress = userChallenges.map((uc) =>
      calculateChallengeProgress(uc, uc.challenge)
    );

    res.status(200).json({
      status: 'success',
      results: challengesWithProgress.length,
      data: {
        challenges: challengesWithProgress,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyCompletedChallenges = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const now = new Date();

    const userChallenges = await prisma.userChallenge.findMany({
      where: {
        userId,
        challenge: {
          endDate: { lt: now },
        },
        completed: true,
      },
      include: {
        challenge: true,
      },
      orderBy: {
        completedAt: 'desc',
      },
    });

    // Format response with progress
    const completedChallenges = userChallenges.map((uc) =>
      calculateChallengeProgress(uc, uc.challenge)
    );

    res.status(200).json({
      status: 'success',
      results: completedChallenges.length,
      data: {
        challenges: completedChallenges,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Admin functions
exports.createChallenge = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      startDate,
      endDate,
      targetValue,
      rewardPoints,
      imageUrl,
    } = req.body;

    const challenge = await prisma.challenge.create({
      data: {
        title,
        description,
        category,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        targetValue: parseFloat(targetValue),
        rewardPoints: parseInt(rewardPoints, 10),
        imageUrl,
      },
    });

    res.status(201).json({
      status: 'success',
      data: {
        challenge,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateChallenge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      startDate,
      endDate,
      targetValue,
      rewardPoints,
      imageUrl,
    } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (startDate) updateData.startDate = new Date(startDate);
    if (endDate) updateData.endDate = new Date(endDate);
    if (targetValue) updateData.targetValue = parseFloat(targetValue);
    if (rewardPoints) updateData.rewardPoints = parseInt(rewardPoints, 10);
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    const challenge = await prisma.challenge.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json({
      status: 'success',
      data: {
        challenge,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteChallenge = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete all user challenges first
    await prisma.userChallenge.deleteMany({
      where: { challengeId: id },
    });

    // Then delete the challenge
    await prisma.challenge.delete({
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

exports.getChallengeParticipants = async (req, res, next) => {
  try {
    const { id } = req.params;

    const participants = await prisma.userChallenge.findMany({
      where: { challengeId: id },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            level: true,
          },
        },
      },
      orderBy: [
        { completed: 'desc' },
        { progress: 'desc' },
      ],
    });

    // Format response
    const formattedParticipants = participants.map((p) => ({
      id: p.user.id,
      fullName: p.user.fullName,
      avatarUrl: p.user.avatarUrl,
      level: p.user.level,
      progress: p.progress,
      completed: p.completed,
      completedAt: p.completedAt,
    }));

    res.status(200).json({
      status: 'success',
      results: formattedParticipants.length,
      data: {
        participants: formattedParticipants,
      },
    });
  } catch (error) {
    next(error);
  }
};
