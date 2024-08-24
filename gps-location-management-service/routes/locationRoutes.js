// gps-management-service/routes/locationRoutes.js

const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

// Existing routes
router.get('/train-name-by-iot-id/:iotId', locationController.getTrainNameByIotId);

// New routes
router.get('/all', locationController.getAllLocations); // Route to get all locations
router.get('/:iotId', locationController.getLocationByIotId); // Route to get location by IOTId

module.exports = router;
