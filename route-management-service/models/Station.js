const db = require('../config/db');

const Station = {
    async create(station) {
        const [result] = await db.query(
            'INSERT INTO stations (StationName, Latitude, Longitude) VALUES (?, ?, ?)',
            [station.StationName, station.Latitude, station.Longitude]
        );
        return result;
    },

    async findAll() {
        const [rows] = await db.query('SELECT * FROM stations');
        return rows;
    },

    async findById(stationId) {
        const [rows] = await db.query('SELECT * FROM stations WHERE StationID = ?', [stationId]);
        return rows[0];
    }
};

module.exports = Station;
