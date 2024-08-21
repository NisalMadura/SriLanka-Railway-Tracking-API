const express = require('express');
const TrainController = require('../controllers/TrainController');

const router = express.Router();

router.post('/trains', TrainController.createTrain);
router.get('/trains', TrainController.getAllTrains);
router.get('/trains/:train_no', TrainController.getTrain);
router.put('/trains/:train_no', TrainController.updateTrain);
router.delete('/trains/:train_no', TrainController.deleteTrain);

module.exports = router;
