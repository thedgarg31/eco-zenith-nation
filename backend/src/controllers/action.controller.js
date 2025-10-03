const { PrismaClient } = require('@prisma/client');
const AppError = require('../utils/appError');

const prisma = new PrismaClient();

// Helper function to calculate CO2 savings based on action type
const calculateCo2Savings = async (category, fromOption, toOption, quantity) => {
  // In a real app, fetch these from the database
  const emissionFactors = {
    travel: {
      car: 0.192, // kg CO2 per km
      bus: 0.089,
      train: 0.041,
      bicycle: 0,
      walking: 0,
      flight: 0.255,
    },
    energy: {
      // kg CO2 per kWh
      coal: 0.82,
      natural_gas: 0.49,
      solar: 0.05,
      wind: 0.01,
      hydro: 0.02,
    },
    // Add more categories as needed
  };

  if (!emissionFactors[category]) {
    throw new AppError('Invalid category', 400);
  }

  const fromEmission = emissionFactors[category][fromOption] || 0;
  const toEmission = emissionFactors[category][toOption] || 0;
  
  return (fromEmission - toEmission) * quantity;
};

// Helper to calculate points based on CO2 savings
const calculatePoints = (co2Saved) => {
  // 1 point per 0.1 kg CO2 saved, minimum 1 point
  return Math.max(1, Math.round(co2Saved * 10));
};

exports.getUserActions = async (req, res, next) => {
  try {
    const { category, startDate, endDate } = req.query;
    
    const where = {
      userId: req.user.id,
    };
    
    if (category) where.category = category;
    if (startDate || endDate) {
      where.datePerformed = {};
      if (startDate) where.datePerformed.gte = new Date(startDate);
      if (endDate) where.datePerformed.lte = new Date(endDate);
    }
    
    const actions = await prisma.action.findMany({
      where,
      orderBy: {
        datePerformed: 'desc',
      },
    });
    
    res.status(200).json({
      status: 'success',
      results: actions.length,
      data: {
        actions,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.logAction = async (req, res, next) => {
  try {
    const { category, actionType, fromOption, toOption, quantity } = req.body;
    
    // Calculate CO2 savings and points
    const co2Saved = await calculateCo2Savings(category, fromOption, toOption, quantity);
    const pointsEarned = calculatePoints(co2Saved);
    
    // Create the action
    const action = await prisma.action.create({
      data: {
        userId: req.user.id,
        category,
        actionType,
        fromOption,
        toOption,
        quantity,
        co2Saved,
        pointsEarned,
      },
    });
    
    // Update user's total CO2 saved and points
    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        totalCo2Saved: { increment: co2Saved },
        coolPoints: { increment: pointsEarned },
      },
    });
    
    // If user is part of an organization, update organization stats
    if (req.user.organizationId) {
      await prisma.organization.update({
        where: { id: req.user.organizationId },
        data: {
          totalCo2Saved: { increment: co2Saved },
          totalCoolPoints: { increment: pointsEarned },
        },
      });
    }
    
    res.status(201).json({
      status: 'success',
      data: {
        action,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAction = async (req, res, next) => {
  try {
    const action = await prisma.action.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });
    
    if (!action) {
      return next(new AppError('No action found with that ID', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        action,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateAction = async (req, res, next) => {
  try {
    const action = await prisma.action.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });
    
    if (!action) {
      return next(new AppError('No action found with that ID', 404));
    }
    
    // If quantity or options changed, recalculate CO2 savings
    const updateData = { ...req.body };
    
    if (['quantity', 'fromOption', 'toOption', 'category'].some(field => field in req.body)) {
      const category = updateData.category || action.category;
      const fromOption = updateData.fromOption || action.fromOption;
      const toOption = updateData.toOption || action.toOption;
      const quantity = updateData.quantity || action.quantity;
      
      const co2Saved = await calculateCo2Savings(category, fromOption, toOption, quantity);
      const pointsEarned = calculatePoints(co2Saved);
      
      updateData.co2Saved = co2Saved;
      updateData.pointsEarned = pointsEarned;
      
      // Update user's total CO2 saved and points
      const co2Diff = co2Saved - action.co2Saved;
      const pointsDiff = pointsEarned - action.pointsEarned;
      
      await prisma.user.update({
        where: { id: req.user.id },
        data: {
          totalCo2Saved: { increment: co2Diff },
          coolPoints: { increment: pointsDiff },
        },
      });
      
      // Update organization stats if applicable
      if (req.user.organizationId) {
        await prisma.organization.update({
          where: { id: req.user.organizationId },
          data: {
            totalCo2Saved: { increment: co2Diff },
            totalCoolPoints: { increment: pointsDiff },
          },
        });
      }
    }
    
    const updatedAction = await prisma.action.update({
      where: { id: req.params.id },
      data: updateData,
    });
    
    res.status(200).json({
      status: 'success',
      data: {
        action: updatedAction,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteAction = async (req, res, next) => {
  try {
    const action = await prisma.action.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });
    
    if (!action) {
      return next(new AppError('No action found with that ID', 404));
    }
    
    // Delete the action
    await prisma.action.delete({
      where: { id: req.params.id },
    });
    
    // Update user's total CO2 saved and points
    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        totalCo2Saved: { decrement: action.co2Saved },
        coolPoints: { decrement: action.pointsEarned },
      },
    });
    
    // Update organization stats if applicable
    if (req.user.organizationId) {
      await prisma.organization.update({
        where: { id: req.user.organizationId },
        data: {
          totalCo2Saved: { decrement: action.co2Saved },
          totalCoolPoints: { decrement: action.pointsEarned },
        },
      });
    }
    
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.getActionCategories = async (req, res, next) => {
  try {
    // In a real app, fetch these from the database
    const categories = [
      {
        id: 'travel',
        name: 'Travel',
        description: 'Track your sustainable travel choices',
        icon: 'car',
        options: [
          { id: 'car', name: 'Car', icon: 'car' },
          { id: 'bus', name: 'Bus', icon: 'bus' },
          { id: 'train', name: 'Train', icon: 'train' },
          { id: 'bicycle', name: 'Bicycle', icon: 'bicycle' },
          { id: 'walking', name: 'Walking', icon: 'walk' },
          { id: 'flight', name: 'Flight', icon: 'plane' },
        ],
      },
      {
        id: 'energy',
        name: 'Energy',
        description: 'Monitor your energy consumption',
        icon: 'zap',
        options: [
          { id: 'coal', name: 'Coal', icon: 'battery' },
          { id: 'natural_gas', name: 'Natural Gas', icon: 'flame' },
          { id: 'solar', name: 'Solar', icon: 'sun' },
          { id: 'wind', name: 'Wind', icon: 'wind' },
          { id: 'hydro', name: 'Hydro', icon: 'droplet' },
        ],
      },
      // Add more categories as needed
    ];
    
    res.status(200).json({
      status: 'success',
      results: categories.length,
      data: {
        categories,
      },
    });
  } catch (error) {
    next(error);
  }
};
