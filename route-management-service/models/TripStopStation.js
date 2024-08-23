const db = require('../config/db');

const TripStopStation = {
    async create(tripStopStation) {
        const [result] = await db.query(
            'INSERT INTO trip_stop_stations (TripNo, StationID, Sequence) VALUES (?, ?, ?)',
            [tripStopStation.TripNo, tripStopStation.StationID, tripStopStation.Sequence]
        );
        return result;
    },

    async findAllByTrip(tripNo) {
        const [rows] = await db.query('SELECT * FROM trip_stop_stations WHERE TripNo = ? ORDER BY Sequence ASC', [tripNo]);
        return rows;
    }
};

module.exports = TripStopStation;
