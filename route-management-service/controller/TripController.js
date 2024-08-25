const TripService = require('../services/TripService');

const TripController = {
    async createTrip(req, res) {
        try {
            const { routeID, departureTime, arrivalTime, duration, trainNo, stopStations } = req.body;
            const tripData = { RouteID: routeID, DepartureTime: departureTime, ArrivalTime: arrivalTime, Duration: duration, TrainNo: trainNo };
            const trip = await TripService.createTrip(tripData, stopStations);
            res.status(201).json(trip);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllTrips(req, res) {
        try {
            const trips = await TripService.getAllTrips();
            res.status(200).json(trips);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getTripById(req, res) {
        try {
            const { id } = req.params;
            const trip = await TripService.getTripById(id);
            if (!trip) {
                return res.status(404).json({ error: 'Trip not found' });
            }
            res.status(200).json(trip);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async getTripDetailsByIotId(req, res) {
        try {
            const { iotId } = req.params;
            const tripDetails = await TripService.getTripDetailsByIotId(iotId);
            res.status(200).json(tripDetails);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = TripController;
