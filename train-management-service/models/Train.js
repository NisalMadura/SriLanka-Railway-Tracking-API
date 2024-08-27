const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

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
