const express = require('express');
const { register, login, updateUser, deleteUser } = require('../controllers/userController');
const { isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Admin-only routes
router.put('/user/:id', isAdmin, updateUser);
router.delete('/user/:id', isAdmin, deleteUser);

module.exports = router;
