const db = require('../config/db');

async function createTrain(trainData) {
    const { train_no, train_name, engine_no } = trainData;
    const [result] = await db.query(
        'INSERT INTO trains (train_no, train_name, engine_no) VALUES (?, ?, ?)', 
        [train_no, train_name, engine_no]
    );
    return { train_no, train_name, engine_no, id: result.insertId };
}

async function getAllTrains() {
    const [rows] = await db.query('SELECT * FROM trains');
    return rows;
}

async function getTrain(train_no) {
    const [rows] = await db.query('SELECT * FROM trains WHERE train_no = ?', [train_no]);
    return rows[0] || null;
}

async function updateTrain(train_no, trainData) {
    const { train_name, engine_no } = trainData;
    const [result] = await db.query(
        'UPDATE trains SET train_name = ?, engine_no = ? WHERE train_no = ?', 
        [train_name, engine_no, train_no]
    );
    if (result.affectedRows === 0) return null;
    return { train_no, train_name, engine_no };
}

async function deleteTrain(train_no) {
    const [result] = await db.query('DELETE FROM trains WHERE train_no = ?', [train_no]);
    return result.affectedRows > 0;
}

async function getTrainNameByIotId(iotId) {
    const [engineRows] = await db.query('SELECT engine_no FROM engines WHERE iot_id = ?', [iotId]);
    if (engineRows.length === 0) {
        return null;
    }
    const engineNo = engineRows[0].engine_no;
    const [trainRows] = await db.query('SELECT train_name FROM trains WHERE engine_no = ?', [engineNo]);
    if (trainRows.length === 0) {
        return null;
    }
    return trainRows[0].train_name;
}

module.exports = {
    createTrain,
    getAllTrains,
    getTrain,
    updateTrain,
    deleteTrain,
    getTrainNameByIotId,
};
