const express = require('express');
const {
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, admin, getAllUsers);

router.get('/:id', protect, getUserById);

router.put('/:id/role', protect, admin, updateUserRole);

router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
