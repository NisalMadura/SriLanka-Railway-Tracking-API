const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

/**
 * @swagger
 * components:
 *   schemas:
 *     Trip:
 *       type: object
 *       required:
 *         - TripNo
 *       properties:
 *         TripNo:
 *           type: string
 *           description: The unique identifier for the trip
 *         RouteID:
 *           type: string
 *           description: The ID of the route associated with this trip
 *         DepartureTime:
 *           type: string
 *           format: date-time
 *           description: The departure time of the trip
 *         ArrivalTime:
 *           type: string
 *           format: date-time
 *           description: The arrival time of the trip
 *         Duration:
 *           type: string
 *           format: time
 *           description: The duration of the trip
 *         TrainNo:
 *           type: string
 *           description: The number of the train assigned to the trip
 *       example:
 *         TripNo: "T12345"
 *         RouteID: "R56789"
 *         DepartureTime: "2024-08-30T10:00:00Z"
 *         ArrivalTime: "2024-08-30T14:00:00Z"
 *         Duration: "04:00:00"
 *         TrainNo: "TN98765"
 */
const Trip = sequelize.define('Trip', {
  TripNo: {
    type: DataTypes.STRING(10),
    allowNull: false,
    primaryKey: true
  },
  RouteID: {
    type: DataTypes.STRING(10),
    allowNull: true,
    references: {
      model: 'Routes', 
      key: 'RouteID'
    }
  },
  DepartureTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ArrivalTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Duration: {
    type: DataTypes.TIME,
    allowNull: true
  },
  TrainNo: {
    type: DataTypes.STRING(50),
    allowNull: true,
    references: {
      model: 'Trains', 
      key: 'train_no'
    }
  }
}, {
  tableName: 'trips',
  timestamps: false
});

module.exports = Trip;
