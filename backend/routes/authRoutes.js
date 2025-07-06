// const express = require('express');
// const router = express.Router();

// // Test route
// router.get('/test', (req, res) => {
//     res.json({ 
//         message: 'Auth routes working!',
//         timestamp: new Date().toISOString()
//     });
// });

// // Login route
// router.post('/login', (req, res) => {
//     res.json({ message: 'Login endpoint - Coming soon!' });
// });

// // Register route
// router.post('/register', (req, res) => {
//     res.json({ message: 'Register endpoint - Coming soon!' });
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

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

module.exports = router;
