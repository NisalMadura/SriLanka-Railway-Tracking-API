const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    const { username, password, roleID } = req.body;
    try {
        const userID = await User.createUser(username, password, roleID);
        res.status(201).json({ userID });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await User.authenticateUser(username, password);
        const token = jwt.sign({ userID: user.UserID, roleID: user.RoleID }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

async function updateUser(req, res) {
    const userID = req.params.id;
    const { username, password, roleID } = req.body;
    try {
        await User.updateUser(userID, username, password, roleID);
        res.status(200).json({ message: 'User updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteUser(req, res) {
    const userID = req.params.id;
    try {
        await User.deleteUser(userID);
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    register,
    login,
    updateUser,
    deleteUser
};
