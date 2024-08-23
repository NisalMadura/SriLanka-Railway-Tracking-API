const TrainService = require('../services/TrainService');

const createTrain = async (req, res) => {
    try {
        const newTrain = await TrainService.createTrain(req.body);
        res.status(201).json(newTrain);
    } catch (error) {
        console.error('Error creating train:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllTrains = async (req, res) => {
    try {
        const trains = await TrainService.getAllTrains();
        res.json(trains);
    } catch (error) {
        console.error('Error fetching trains:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getTrain = async (req, res) => {
    try {
        const train = await TrainService.getTrain(req.params.train_no);
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }
        res.json(train);
    } catch (error) {
        console.error('Error fetching train:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateTrain = async (req, res) => {
    try {
        const updatedTrain = await TrainService.updateTrain(req.params.train_no, req.body);
        if (!updatedTrain) {
            return res.status(404).json({ message: 'Train not found' });
        }
        res.json(updatedTrain);
    } catch (error) {
        console.error('Error updating train:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteTrain = async (req, res) => {
    try {
        const deletedTrain = await TrainService.deleteTrain(req.params.train_no);
        if (!deletedTrain) {
            return res.status(404).json({ message: 'Train not found' });
        }
        res.json({ message: 'Train deleted successfully' });
    } catch (error) {
        console.error('Error deleting train:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getTrainByIotId = async (req, res) => {
    try {
        const trainName = await TrainService.getTrainNameByIotId(req.params.iotId);
        if (!trainName) {
            return res.status(404).json({ message: 'Train not found' });
        }
        res.json({ train_name: trainName });
    } catch (error) {
        console.error('Error fetching train by IoT ID:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createTrain,
    getAllTrains,
    getTrain,
    updateTrain,
    deleteTrain,
    getTrainByIotId,
};
