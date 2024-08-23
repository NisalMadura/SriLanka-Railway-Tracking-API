const db = require('../config/db');

const Trip = {
    async create(trip) {
        const [result] = await db.query(
            'INSERT INTO trips (RouteID, DepartureTime, ArrivalTime, Duration, TrainNo) VALUES (?, ?, ?, ?, ?)',
            [trip.RouteID, trip.DepartureTime, trip.ArrivalTime, trip.Duration, trip.TrainNo]
        );
        return result;
    },

    async findAll() {
        const [rows] = await db.query('SELECT * FROM trips');
        return rows;
    },

    async findById(tripNo) {
        const [rows] = await db.query('SELECT * FROM trips WHERE TripNo = ?', [tripNo]);
        return rows[0];
    }
};

module.exports = Trip;
