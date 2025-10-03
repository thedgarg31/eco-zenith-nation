const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const actionRoutes = require('./routes/action.routes');
const challengeRoutes = require('./routes/challenge.routes');
const organizationRoutes = require('./routes/organization.routes');
const adminRoutes = require('./routes/admin.routes'); // Add admin routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/actions', actionRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/admin', adminRoutes); // Add admin routes

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
  });
});

// Handle 404 errors
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});