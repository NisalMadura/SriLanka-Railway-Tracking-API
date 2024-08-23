const express = require('express');
const TripController = require('../controllers/TripController');

const router = express.Router();

router.post('/', TripController.createTrip);
router.get('/', TripController.getAllTrips);
router.get('/:id', TripController.getTripById);

module.exports = router;
