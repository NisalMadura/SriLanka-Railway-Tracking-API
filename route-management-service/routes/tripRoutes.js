const express = require('express');
const TripController = require('../controller/TripController');

const router = express.Router();

router.post('/', TripController.createTrip);
router.get('/', TripController.getAllTrips);
router.get('/:id', TripController.getTripById);
router.get('/by-iot-id/:iotId', TripController.getTripDetailsByIotId);

module.exports = router;
