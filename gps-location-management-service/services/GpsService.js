// gps-management-service/services/GpsService.js

const axios = require('axios');

async function getTrainNameByIotId(iotId) {
    try {
        const response = await axios.get(`http://localhost:3001/api/trains/by-iot-id/${iotId}`);
        return response.data.train_name;
    } catch (error) {
        console.error('Error fetching train name:', error);
        throw error;
    }
}

module.exports = {
    getTrainNameByIotId,
};
