const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

/**
 * @swagger
 * components:
 *   schemas:
 *     Train:
 *       type: object
 *       required:
 *         - train_no
 *         - train_name
 *       properties:
 *         train_no:
 *           type: string
 *           description: The unique train number
 *         engine_no:
 *           type: string
 *           description: The engine number associated with the train
 *         train_name:
 *           type: string
 *           description: The name of the train
 *         train_type:
 *           type: string
 *           description: The type of the train (e.g., express, local)
 *         train_class:
 *           type: string
 *           description: The class of the train (e.g., first-class, second-class)
 *         description:
 *           type: string
 *           description: Additional details about the train
 *         capacity:
 *           type: integer
 *           description: The total capacity of the train
 *         is_operational:
 *           type: boolean
 *           description: Whether the train is currently operational
 *       example:
 *         train_no: "12345"
 *         engine_no: "ENG123"
 *         train_name: "Express Train"
 *         train_type: "Express"
 *         train_class: "First Class"
 *         description: "This is a fast train with limited stops."
 *         capacity: 300
 *         is_operational: true
 */
const Train = sequelize.define('Train', {
  train_no: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true
  },
  engine_no: {
    type: DataTypes.STRING(50),
    allowNull: true,
    references: {
      model: 'Engines', 
      key: 'engine_no'
    }
  },
  train_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  train_type: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  train_class: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  is_operational: {
    type: DataTypes.TINYINT(1),
    allowNull: true,
    defaultValue: 1
  }
}, {
  tableName: 'trains',
  timestamps: false
});

module.exports = Train;
