const pool = require('../config/db');

const Train = {
    async create(train) {
        const [result] = await pool.query(
            'INSERT INTO trains (train_no, engine_no, train_name, train_type, description) VALUES (?, ?, ?, ?, ?)',
            [train.train_no, train.engine_no, train.train_name, train.train_type, train.description]
        );
        return result;
    },

    async findAll() {
        const [rows] = await pool.query('SELECT * FROM trains');
        return rows;
    },

    async findById(train_no) {
        const [rows] = await pool.query('SELECT * FROM trains WHERE train_no = ?', [train_no]);
        return rows[0];
    },

    async update(train_no, train) {
        const [result] = await pool.query(
            'UPDATE trains SET engine_no = ?, train_name = ?, train_type = ?, description = ? WHERE train_no = ?',
            [train.engine_no, train.train_name, train.train_type, train.description, train_no]
        );
        return result;
    },

    async delete(train_no) {
        const [result] = await pool.query('DELETE FROM trains WHERE train_no = ?', [train_no]);
        return result;
    },
};

module.exports = Train;
