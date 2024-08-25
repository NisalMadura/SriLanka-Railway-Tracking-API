const Train = require('../models/Train');

async function createTrain(trainData) {
    try {
        return await Train.createTrain(trainData);
    } catch (error) {
        throw new Error(`Error creating train: ${error.message}`);
    }
}

async function getAllTrains() {
    try {
        return await Train.getAllTrains();
    } catch (error) {
        throw new Error(`Error fetching all trains: ${error.message}`);
    }
}

async function getTrain(train_no) {
    try {
        return await Train.getTrain(train_no);
    } catch (error) {
        throw new Error(`Error fetching train: ${error.message}`);
    }
}

async function updateTrain(train_no, trainData) {
    try {
        return await Train.updateTrain(train_no, trainData);
    } catch (error) {
        throw new Error(`Error updating train: ${error.message}`);
    }
}

async function deleteTrain(train_no) {
    try {
        return await Train.deleteTrain(train_no);
    } catch (error) {
        throw new Error(`Error deleting train: ${error.message}`);
    }
}

async function getTrainByIotId(iotId) {
    try {
        return await Train.getTrainByIotId(iotId);
    } catch (error) {
        throw new Error(`Error fetching train by IoT ID: ${error.message}`);
    }
}


module.exports = {
    createTrain,
    getAllTrains,
    getTrain,
    updateTrain,
    deleteTrain,
    getTrainByIotId,
};