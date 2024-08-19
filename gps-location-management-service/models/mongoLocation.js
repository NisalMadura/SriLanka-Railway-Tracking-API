const mongoose = require('../config/mongodb');

const mongoLocationSchema = new mongoose.Schema({
  IOTId: String,
  Latitude: Number,
  Longitude: Number,
  Speed: Number,
  EngineTemp: Number,
  EngineStatus: String,
  Timestamp: Date,
  NetworkStrength: Number,
  DeviceHealth: String,
  LocationAccuracy: String,
  LocationName: String,
});

const MongoLocation = mongoose.model('MongoLocation', mongoLocationSchema);

module.exports = MongoLocation;
