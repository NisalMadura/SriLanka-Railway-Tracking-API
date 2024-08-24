const pool = require('../config/db');

const Engine = {
    async create(engine) {
        const [result] = await pool.query(
            'INSERT INTO engines (engine_no, iot_id, status, engine_type, other_engine_data) VALUES (?, ?, ?, ?, ?)',
            [engine.engine_no, engine.iot_id, engine.status, engine.engine_type, JSON.stringify(engine.other_engine_data)]
        );
        return result;
    },

    async findAll() {
        const [rows] = await pool.query('SELECT * FROM engines');
        return rows;
    },

    async findById(engine_no) {
        const [rows] = await pool.query('SELECT * FROM engines WHERE engine_no = ?', [engine_no]);
        return rows[0];
    },

    async update(engine_no, engine) {
        const [result] = await pool.query(
            'UPDATE engines SET iot_id = ?, status = ?, engine_type = ?, other_engine_data = ? WHERE engine_no = ?',
            [engine.iot_id, engine.status, engine.engine_type, JSON.stringify(engine.other_engine_data), engine_no]
        );
        return result;
    },

    async delete(engine_no) {
        const [result] = await pool.query('DELETE FROM engines WHERE engine_no = ?', [engine_no]);
        return result;
    },

    async findByIotId(iotId) {
        const [rows] = await db.query('SELECT * FROM engines WHERE IotID = ?', [iotId]);
        return rows[0];
    }
};

module.exports = Engine;
