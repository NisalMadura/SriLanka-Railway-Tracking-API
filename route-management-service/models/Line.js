const db = require('../config/db');

const Line = {
    async create(line) {
        const [result] = await db.query(
            'INSERT INTO line (LineName, Distance) VALUES (?, ?)',
            [line.LineName, line.Distance]
        );
        return result;
    },

    async findAll() {
        const [rows] = await db.query('SELECT * FROM line');
        return rows;
    },

    async findById(lineId) {
        const [rows] = await db.query('SELECT * FROM line WHERE LineID = ?', [lineId]);
        return rows[0];
    }
};

module.exports = Line;
