const axios = require('axios');
const Trip = require('../models/Trip');

const TripService = {
    async createTrip(tripData, stopStations) {
        try {
            const trip = await Trip.create(tripData);

            for (let i = 0; i < stopStations.length; i++) {
                // Add logic here if you need to create related stop stations
                // e.g., await StopStation.create({ TripID: trip.id, StationID: stopStations[i], Sequence: i + 1 });
            }

            return trip;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getAllTrips() {
        try {
            return await Trip.findAll();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getTripById(tripId) {
        try {
            const trip = await Trip.findByPk(tripId); // Adjust based on your ORM
            return trip;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getTripDetailsByIotId(iotId) {
        try {
            const response = await axios.get(`http://localhost:3307/api/by-iot-id/${iotId}`);
            const trainData = response.data;

            if (!trainData || !trainData.train_no) {
                throw new Error('Train data not found for the given IoT ID');
            }

            const trips = await Trip.findAll({
                where: {
                    TrainNo: trainData.train_no
                }
            });

            if (trips.length === 0) {
                throw new Error('No trips found for the given TrainNo');
            }

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
