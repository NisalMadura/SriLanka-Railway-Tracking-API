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
async function findByEngineId(engineId) {
    const [rows] = await db.query('SELECT TrainNo FROM trains WHERE EngineID = ?', [engineId]);
    return rows[0];
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


async function getTrainByIotId(iotId) {
    // Find the engine using IoT ID
    const [engineRows] = await db.query('SELECT * FROM engines WHERE iot_id = ?', [iotId]);
    if (engineRows.length === 0) {
        return null;
    }
    const engine = engineRows[0];

    // Find the train using the engine number
    const [trainRows] = await db.query('SELECT * FROM trains WHERE engine_no = ?', [engine.engine_no]);
    if (trainRows.length === 0) {
        return null;
    }
    const train = trainRows[0];

    // Combine engine and train details
    return { ...train, engine };

    
}

module.exports = {
    createTrain,
    getAllTrains,
    getTrain,
    updateTrain,
    deleteTrain,
    getTrainByIotId,
    findByEngineId,
};
