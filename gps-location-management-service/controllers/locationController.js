const axios = require('axios');
const Location = require('../models/location');
const MongoLocation = require('../models/mongoLocation');
const GpsService = require('../services/GpsService');

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse?format=json';

// Controller function to create a new location
exports.createLocation = async (req, res) => {
  try {
    const { iotId, latitude, longitude, speed, engineTemp, engineStatus, timestamp, networkStrength, deviceHealth, locationAccuracy } = req.body;

    // Validate required fields
    if (!iotId || latitude === undefined || longitude === undefined || !timestamp) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Reverse geocode to get location name
    const locationName = await reverseGeocode(latitude, longitude);

    // Save to MySQL
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

    // Save to MongoDB
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

    // Respond with success
    res.status(201).json({ success: true, location: mysqlLocation });
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Controller function to get train name by IoT ID
exports.getTrainNameByIotId = async (req, res) => {
  try {
    const trainName = await GpsService.getTrainNameByIotId(req.params.iotId);
    res.json({ train_name: trainName });
  } catch (error) {
    console.error('Error fetching train name:', error);
    res.status(500).json({ message: 'Error fetching train name', error });
  }
};

// Controller function to get all locations
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll(); // Assuming using Sequelize or similar ORM
    res.json(locations);
  } catch (error) {
    console.error('Error fetching all locations:', error);
    res.status(500).json({ message: 'Error fetching all locations', error });
  }
};

// Controller function to get location by IoT ID
exports.getLocationByIotId = async (req, res) => {
  try {
    // Fetch the latest location by sorting on the timestamp in descending order
    const location = await Location.findOne({
      where: { IOTId: req.params.iotId },
      order: [['createdAt', 'DESC']] // or 'updatedAt' if that is your timestamp field
    });

    if (location) {
      res.json(location);
    } else {
      res.status(404).json({ message: 'Location not found' });
    }
  } catch (error) {
    console.error('Error fetching location by IoT ID:', error);
    res.status(500).json({ message: 'Error fetching location by IoT ID', error });
  }
};

const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await axios.get(NOMINATIM_URL, {
      params: {
        lat: latitude,
        lon: longitude,
        zoom: 18, // Adjust zoom level as needed
        addressdetails: 1
      }
    });

    const { address } = response.data;

    // Extract address components
    const city = address.city || address.town || address.village || address.suburb || '';
    const locality = address.neighborhood || address.road || '';
    const state = address.state || address.province || '';
    const country = address.country || '';

    // Initialize location name
    let locationName = city;

    // Check for railway station keyword in locality or other address components
    const isRailwayStation = [locality, address.railway, address.amenity].some(term => term && term.toLowerCase().includes('station'));

    if (isRailwayStation) {
      locationName = `${city} Station`; // Append "Station" if it's a railway station
    } else if (locality) {
      locationName = `${locality}, ${city}`; // Combine locality and city if locality is present
    }

    if (state) {
      locationName += `, ${state}`;
    }
    if (country) {
      locationName += `, ${country}`;
    }

    return locationName.trim();
  } catch (error) {
    console.error('Error fetching location name:', error);
    return 'Unknown location';
  }
};


