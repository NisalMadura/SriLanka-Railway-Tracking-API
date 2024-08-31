const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - Username
 *         - PasswordHash
 *         - RoleID
 *       properties:
 *         Username:
 *           type: string
 *           description: The unique username of the user
 *         PasswordHash:
 *           type: string
 *           description: The hashed password of the user
 *         RoleID:
 *           type: integer
 *           description: The role ID assigned to the user
 *       example:
 *         Username: "john_doe"
 *         PasswordHash: "$2a$10$examplehashedpassword"
 *         RoleID: 1
 */
class User extends Model {
  /**
   * Create a new user with hashed password
   * @param {string} username - The username for the new user
   * @param {string} password - The password for the new user
   * @param {number} roleID - The role ID for the new user
   * @returns {Promise<User>} The created user
   * @throws {Error} If user creation fails
   */
  static async createUser(username, password, roleID) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.create({
      Username: username,
      PasswordHash: hashedPassword,
      RoleID: roleID,
    });
  }

  /**
   * Update an existing user
   * @param {number} userID - The ID of the user to update
   * @param {string} [username] - The new username for the user
   * @param {string} [password] - The new password for the user
   * @param {number} [roleID] - The new role ID for the user
   * @returns {Promise<User>} The updated user
   * @throws {Error} If the user is not found or update fails
   */
  static async updateUser(userID, username, password, roleID) {
    const user = await this.findByPk(userID);
    if (!user) {
      throw new Error('User not found');
    }

    if (username) user.Username = username;
    if (password) user.PasswordHash = await bcrypt.hash(password, 10);
    if (roleID) user.RoleID = roleID;

    return user.save();
  }

  /**
   * Delete an existing user
   * @param {number} userID - The ID of the user to delete
   * @returns {Promise<void>} Resolves when the user is deleted
   * @throws {Error} If the user is not found or deletion fails
   */
  static async deleteUser(userID) {
    const user = await this.findByPk(userID);
    if (!user) {
      throw new Error('User not found');
    }
    return user.destroy();
  }

  /**
   * Authenticate a user with username and password
   * @param {string} username - The username of the user
   * @param {string} password - The password of the user
   * @returns {Promise<User>} The authenticated user
   * @throws {Error} If authentication fails
   */
  static async authenticateUser(username, password) {
    const user = await this.findOne({ where: { Username: username } });
    if (user && await bcrypt.compare(password, user.PasswordHash)) {
      return user;
    }
    throw new Error('Invalid credentials');
  }
}

User.init({
  Username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  PasswordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  RoleID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
});

module.exports = User;
