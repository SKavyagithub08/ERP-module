const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const User = require('../models/User');

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Optional: test route to verify route file is connected
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Auth routes working!',
    timestamp: new Date().toISOString()
  });
});

// Debug route to see all users (remove in production)
router.get('/debug/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users.map(user => ({
      username: user.username,
      email: user.email,
      role: user.role,
      hasPassword: !!user.password
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
