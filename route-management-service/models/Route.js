const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Import your Sequelize instance

const Route = sequelize.define('Route', {
  RouteID: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true
  },
  LineID: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  DepartureStation: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  ArrivalStation: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'routes',
  timestamps: false
});

module.exports = Route;
