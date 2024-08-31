const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

/**
 * @swagger
 * components:
 *   schemas:
 *     Route:
 *       type: object
 *       required:
 *         - RouteID
 *       properties:
 *         RouteID:
 *           type: string
 *           description: The unique identifier for the route
 *         LineID:
 *           type: string
 *           description: The ID of the line associated with this route
 *         DepartureStation:
 *           type: string
 *           description: The name of the departure station
 *         ArrivalStation:
 *           type: string
 *           description: The name of the arrival station
 *       example:
 *         RouteID: "R12345"
 *         LineID: "L56789"
 *         DepartureStation: "Central Station"
 *         ArrivalStation: "West End Station"
 */
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
