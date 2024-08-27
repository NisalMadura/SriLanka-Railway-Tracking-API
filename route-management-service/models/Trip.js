const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

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
