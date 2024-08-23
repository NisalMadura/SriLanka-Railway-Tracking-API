const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

//router.post('/', locationController.createLocation);
router.get('/train-name-by-iot-id/:iotId', locationController.getTrainNameByIotId);
module.exports = router;
