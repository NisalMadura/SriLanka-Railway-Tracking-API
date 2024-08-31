const express = require('express');
const { register, login, updateUser, deleteUser } = require('../controllers/userController');
const { isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management operations
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided credentials.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               roleID:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userID:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Bad request
 */
router.post('/register', register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user with the provided credentials and returns a token.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user details
 *     description: Updates the details of an existing user. Admin access required.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe_updated"
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *               roleID:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.put('/user/:id', isAdmin, updateUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user by their ID. Admin access required.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: User not found
 */
router.delete('/user/:id', isAdmin, deleteUser);

module.exports = router;
