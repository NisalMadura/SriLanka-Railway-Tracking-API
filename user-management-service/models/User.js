const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

class User extends Model {
  static async createUser(username, password, roleID) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.create({
      Username: username,
      PasswordHash: hashedPassword,
      RoleID: roleID,
    });
  }

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

  static async deleteUser(userID) {
    const user = await this.findByPk(userID);
    if (!user) {
      throw new Error('User not found');
    }
    return user.destroy();
  }

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
