const db = require('../config/db');

const RouteStation = {
    async create(routeStation) {
        const [result] = await db.query(
            'INSERT INTO route_stations (RouteID, StationID, Sequence) VALUES (?, ?, ?)',
            [routeStation.RouteID, routeStation.StationID, routeStation.Sequence]
        );
        return result;
    },

    async findAllByRoute(routeId) {
        const [rows] = await db.query('SELECT * FROM route_stations WHERE RouteID = ? ORDER BY Sequence ASC', [routeId]);
        return rows;
    }
};

module.exports = RouteStation;
