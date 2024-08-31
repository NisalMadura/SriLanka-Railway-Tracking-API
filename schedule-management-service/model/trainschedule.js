/**
 * @swagger
 * components:
 *   schemas:
 *     TrainSchedule:
 *       type: object
 *       required:
 *         - TrainName
 *         - DepartureStation
 *         - ArrivalStation
 *         - DepartureTime
 *         - ArrivalTime
 *         - Status
 *       properties:
 *         TrainID:
 *           type: integer
 *           description: The auto-generated ID of the train schedule
 *         TrainName:
 *           type: string
 *           description: The name of the train
 *         DepartureStation:
 *           type: string
 *           description: The departure station
 *         ArrivalStation:
 *           type: string
 *           description: The arrival station
 *         DepartureTime:
 *           type: string
 *           format: date-time
 *           description: The time of departure
 *         ArrivalTime:
 *           type: string
 *           format: date-time
 *           description: The time of arrival
 *         Status:
 *           type: string
 *           description: The status of the train schedule
 *       example:
 *         TrainID: 1
 *         TrainName: "Express Train"
 *         DepartureStation: "Station A"
 *         ArrivalStation: "Station B"
 *         DepartureTime: "2024-08-30T12:00:00.000Z"
 *         ArrivalTime: "2024-08-30T14:00:00.000Z"
 *         Status: "On Time"
 */

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Train extends Model {}

Train.init({
  TrainID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  TrainName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DepartureStation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ArrivalStation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DepartureTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  ArrivalTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Train',
});

module.exports = Train;
