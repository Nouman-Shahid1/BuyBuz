const express = require('express');
const { registerUser, loginUser, updateUserRole, logoutUser } = require('../controllers/authController');
const router = express.Router();

// Register User
router.post('/register', registerUser);

// Login User
router.post('/login', loginUser);

// Logout User
router.post('/logout', logoutUser);

// Update User Role
router.post('/update-role', updateUserRole);

module.exports = router;
