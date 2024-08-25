const db = require('../config/db');

const Route = {
    async create(route) {
        const [result] = await db.query(
            'INSERT INTO routes (LineID, DepartureStation, ArrivalStation) VALUES (?, ?, ?)',
            [route.LineID, route.DepartureStation, route.ArrivalStation]
        );
        return result;
    },

    async findAll() {
        const [rows] = await db.query('SELECT * FROM routes');
        return rows;
    },

    async findById(routeId) {
        const [rows] = await db.query('SELECT * FROM routes WHERE RouteID = ?', [routeId]);
        return rows[0];
    }
};

module.exports = Route;
