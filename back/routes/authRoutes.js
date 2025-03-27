const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Protected route (authentication required)
router.get('/protected', authMiddleware, (req, res) => {
    res.json({
        message: 'This is a protected route',
        user: req.user, // User information from the token
    });
});

module.exports = router;