const axios = require('axios');
const Location = require('../models/location');
const MongoLocation = require('../models/mongoLocation');

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse?format=json';
// gps-management-service/controllers/GpsController.js

const GpsService = require('../services/GpsService');

const getTrainNameByIotId = async (req, res) => {
    try {
        const trainName = await GpsService.getTrainNameByIotId(req.params.iotId);
        res.json({ train_name: trainName });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching train name', error });
    }
};
// New method: Get all locations
const getAllLocations = async (req, res) => {
  try {
      const locations = await Location.findAll(); // Assuming using Sequelize or similar ORM
      res.json(locations);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching all locations', error });
  }
};

// New method: Get location data by IOTId
const getLocationByIotId = async (req, res) => {
  try {
      const location = await Location.findOne({ where: { IOTId: req.params.iotId } });
      if (location) {
          res.json(location);
      } else {
          res.status(404).json({ message: 'Location not found' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error fetching location by IOTId', error });
  }
};
module.exports = {
    getTrainNameByIotId,
    getAllLocations, // Export new method
    getLocationByIotId, // Export new method
};

const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await axios.get(NOMINATIM_URL, {
      params: {
        lat: latitude,
        lon: longitude,
        zoom: 18,
        addressdetails: 1
      }
    });
    return response.data.display_name;
  } catch (error) {
    console.error('Error fetching location name:', error);
    return 'Unknown location';
  }
};

exports.createLocation = async (req, res) => {
  try {
    const { iotId, latitude, longitude, speed, engineTemp, engineStatus, timestamp, networkStrength, deviceHealth, locationAccuracy } = req.body;

    
    if (!iotId || latitude === undefined || longitude === undefined || !timestamp) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Reverse geocode
    const locationName = await reverseGeocode(latitude, longitude);

  
    const mysqlLocation = await Location.create({
      IOTId: iotId,
      Latitude: latitude,
      Longitude: longitude,
      Speed: speed,
      EngineTemp: engineTemp,
      EngineStatus: engineStatus,
      Timestamp: new Date(timestamp),
      NetworkStrength: networkStrength,
      DeviceHealth: deviceHealth,
      LocationAccuracy: locationAccuracy,
      LocationName: locationName,
    });

    
    const mongoLocation = new MongoLocation({
      IOTId: iotId,
      Latitude: latitude,
      Longitude: longitude,
      Speed: speed,
      EngineTemp: engineTemp,
      EngineStatus: engineStatus,
      Timestamp: new Date(timestamp),
      NetworkStrength: networkStrength,
      DeviceHealth: deviceHealth,
      LocationAccuracy: locationAccuracy,
      LocationName: locationName,
    });

    await mongoLocation.save();

    res.status(201).json({ success: true, location: mysqlLocation });
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
