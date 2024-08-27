

const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');


router.get('/train-name-by-iot-id/:iotId', locationController.getTrainNameByIotId);


router.get('/all', locationController.getAllLocations); 
router.get('/:iotId', locationController.getLocationByIotId); 
router.post('/', locationController.createLocation);
module.exports = router;
