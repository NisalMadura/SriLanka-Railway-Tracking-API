const Trip = require('../models/Trip');
const TripStopStation = require('../models/TripStopStation');

const TripService = {
    async createTrip(tripData, stopStations) {
        const trip = await Trip.create(tripData);

        for (let i = 0; i < stopStations.length; i++) {
            await TripStopStation.create({
                TripNo: trip.insertId,
                StationID: stopStations[i],
                Sequence: i + 1
            });
        }

        return trip;
    },

    async getAllTrips() {
        return await Trip.findAll();
    },

    async getTripById(tripNo) {
        const trip = await Trip.findById(tripNo);
        const stopStations = await TripStopStation.findAllByTrip(tripNo);
        return { trip, stopStations };
    }
};

module.exports = TripService;
