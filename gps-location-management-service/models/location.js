const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       required:
 *         - IOTId
 *         - Latitude
 *         - Longitude
 *         - Timestamp
 *       properties:
 *         LocationID:
 *           type: integer
 *           description: The unique identifier for the location entry
 *         IOTId:
 *           type: string
 *           description: The IoT identifier associated with the location
 *         Latitude:
 *           type: number
 *           format: float
 *           description: The latitude coordinate of the location
 *         Longitude:
 *           type: number
 *           format: float
 *           description: The longitude coordinate of the location
 *         Speed:
 *           type: string
 *           description: The speed of the train or vehicle at the location
 *         EngineTemp:
 *           type: number
 *           format: float
 *           description: The engine temperature at the location
 *         EngineStatus:
 *           type: string
 *           description: The status of the engine at the location
 *         Timestamp:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the location was recorded
 *         NetworkStrength:
 *           type: integer
 *           description: The network strength at the location
 *         DeviceHealth:
 *           type: string
 *           description: The health status of the device at the location
 *         LocationAccuracy:
 *           type: string
 *           description: The accuracy of the location data
 *         LocationName:
 *           type: string
 *           description: The name of the location
 *       example:
 *         LocationID: 1
 *         IOTId: "123456"
 *         Latitude: 37.774929
 *         Longitude: -122.419418
 *         Speed: "60 km/h"
 *         EngineTemp: 85.00
 *         EngineStatus: "Running"
 *         Timestamp: "2024-08-30T14:48:00Z"
 *         NetworkStrength: 75
 *         DeviceHealth: "Good"
 *         LocationAccuracy: "High"
 *         LocationName: "San Francisco"
 */
const Location = sequelize.define('location', {
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
    type: DataTypes.STRING,
  },
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
  tableName: 'location',
});

module.exports = Location;
