const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Location = sequelize.define('Location', {
  LocationID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  IOTId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Latitude: {
    type: DataTypes.FLOAT(10, 6),
    allowNull: false,
  },
  Longitude: {
    type: DataTypes.FLOAT(10, 6),
    allowNull: false,
  },
  Speed: {
    type: DataTypes.STRING,  },
  EngineTemp: {
    type: DataTypes.FLOAT(5, 2),
  },
  EngineStatus: {
    type: DataTypes.STRING,
  },
  Timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  NetworkStrength: {
    type: DataTypes.INTEGER,
  },
  DeviceHealth: {
    type: DataTypes.STRING,
  },
  LocationAccuracy: {
    type: DataTypes.STRING,
    allowNull: true,

  },
  LocationName: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true, 
  tableName: 'Location',
});

module.exports = Location;
