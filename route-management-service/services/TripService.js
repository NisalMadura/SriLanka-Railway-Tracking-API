const axios = require('axios');
const Trip = require('../models/Trip');

const TripService = {
    async getTripDetailsByIotId(iotId) {
        try {
            // Make an HTTP request to the provided API endpoint to get train and engine details by IoT ID
            const response = await axios.get(`http://localhost:3307/api/by-iot-id/${iotId}`);
            const trainData = response.data;

            if (!trainData || !trainData.train_no) {
                throw new Error('Train data not found for the given IoT ID');
            }

            // Find trips by TrainNo in your current service
            const trips = await Trip.findByTrainNo(trainData.train_no);
            if (trips.length === 0) {
                throw new Error('No trips found for the given TrainNo');
            }

            // Include the train and engine details in the response
            return {
                trips,
                trainDetails: trainData
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }
};

module.exports = TripService;
