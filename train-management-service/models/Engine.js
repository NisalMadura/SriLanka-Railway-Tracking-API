const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

/**
 * @swagger
 * components:
 *   schemas:
 *     Engine:
 *       type: object
 *       required:
 *         - engine_no
 *         - iot_id
 *       properties:
 *         engine_no:
 *           type: string
 *           description: The unique engine number
 *         iot_id:
 *           type: string
 *           description: The unique IoT ID associated with the engine
 *         status:
 *           type: string
 *           description: The current status of the engine
 *         engine_type:
 *           type: string
 *           description: The type of the engine
 *         manufacturer:
 *           type: string
 *           description: The manufacturer of the engine
 *         model:
 *           type: string
 *           description: The model of the engine
 *         horsepower:
 *           type: integer
 *           description: The horsepower rating of the engine
 *         manufacture_date:
 *           type: string
 *           format: date
 *           description: The date when the engine was manufactured
 *         last_service_date:
 *           type: string
 *           format: date
 *           description: The date when the engine was last serviced
 *         next_service_due:
 *           type: string
 *           format: date
 *           description: The date when the next service is due
 *         is_operational:
 *           type: boolean
 *           description: Whether the engine is currently operational
 *       example:
 *         engine_no: "ENG12345"
 *         iot_id: "IoT-56789"
 *         status: "Operational"
 *         engine_type: "Diesel"
 *         manufacturer: "EngineCorp"
 *         model: "X1000"
 *         horsepower: 500
 *         manufacture_date: "2022-01-01"
 *         last_service_date: "2023-06-15"
 *         next_service_due: "2024-06-15"
 *         is_operational: true
 */
const Engine = sequelize.define('Engine', {
  engine_no: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true
  },
  iot_id: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  engine_type: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  manufacturer: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  model: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  horsepower: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  manufacture_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  last_service_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  next_service_due: {
    type: DataTypes.DATE,
    allowNull: true
  },
  is_operational: {
    type: DataTypes.TINYINT(1),
    allowNull: true,
    defaultValue: 1
  }
}, {
  tableName: 'engines',
  timestamps: false
});

module.exports = Engine;
