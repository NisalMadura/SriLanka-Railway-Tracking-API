const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

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
