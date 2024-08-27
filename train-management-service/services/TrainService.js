const Train = require('../models/Train');
const Engine = require('../models/Engine');

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
        
        const engine = await Engine.findOne({ where: { iot_id: iotId } });

        if (!engine) {
            console.warn('No engine found with IoT ID:', iotId);
            return null;
        }

        
        const train = await Train.findOne({ where: { engine_no: engine.engine_no } });

        if (!train) {
            console.warn('No train found with engine number:', engine.engine_no);
            return null;
        }

        
        return { ...train.toJSON(), engine: engine.toJSON() };
    } catch (error) {
        console.error('Error fetching train by IoT ID:', error);
        throw error;
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