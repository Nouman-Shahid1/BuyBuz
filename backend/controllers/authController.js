const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields: name, email, and password.' });
    }

    if (role && !['buyer', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role. Allowed roles are buyer and admin.' });
    }

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'buyer', // Default role is buyer
        });

        if (user) {
            return res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id, user.role),
            });
        } else {
            return res.status(400).json({ message: 'Invalid user data. User could not be created.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password.' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            return res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id, user.role),
            });
        } else {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Update User Role
const updateUserRole = async (req, res) => {
    const { userId, role } = req.body;

    // Validate input
    if (!userId || !role) {
        return res.status(400).json({ message: 'Please provide both userId and role.' });
    }

    if (!['buyer', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role. Allowed roles are buyer and admin.' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.role = role;
        await user.save();

        return res.status(200).json({ message: 'User role updated successfully.', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { registerUser, loginUser, updateUserRole };
