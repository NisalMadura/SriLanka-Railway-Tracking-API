const axios = require('axios');
const db = require('./db'); // Ensure this points to your database connection

const TRIP_API_URL = 'http://localhost:3308/api/trips/by-iot-id/';
const TRAIN_API_URL = 'http://localhost:3307/api/by-iot-id/';
const LOCATION_API_URL = 'http://localhost:3000/api/location/';


// Function to convert ISO 8601 datetime to MySQL DATETIME format
function convertToMySQLDatetime(isoDate) {
    if (!isoDate) return null;
    return new Date(isoDate).toISOString().slice(0, 19).replace('T', ' ');
}

async function fetchActiveIotDevices() {
    const [rows] = await db.execute('SELECT IOTid FROM IoTDeviceStatus WHERE Status = 1');
    return rows.map(row => row.IOTid);
}

async function fetchData(iotId) {
    try {
        // Fetch data from train and trip services
        const [trainResponse, tripResponse,locationResponse] = await Promise.all([
            axios.get(`${TRAIN_API_URL}${iotId}`),
            axios.get(`${TRIP_API_URL}${iotId}`),
            axios.get(`${LOCATION_API_URL}${iotId}`),

            // Add GPS API call if required
        ]);

        const trainData = trainResponse.data;
        const tripData = tripResponse.data;
        const locationData = locationResponse.data;


        // Ensure trainData and tripData are objects
        if (typeof trainData !== 'object' || typeof tripData !== 'object' || typeof locationData !== 'object') {
            console.error('Train or Trip data is not an object:', trainData, tripData,locationData);
            return;
        }

        // Extract train and engine details
        const locationDetails = locationData;
        const trainDetails = trainData;
        const engineDetails = trainData.engine;
        const trips = tripData.trips[0]; // Assuming there is at least one trip and we take the first one

        if (!trips) {
            console.error('No trips found for the given IOT ID:', iotId);
            return;
        }

        // Convert datetime values to MySQL format
        const departureTime = convertToMySQLDatetime(trips.DepartureTime);
        const arrivalTime = convertToMySQLDatetime(trips.ArrivalTime);
        const timestamp = convertToMySQLDatetime(locationDetails.Timestamp);

        const sql = `
            INSERT INTO RunningTrains (IOTid, TrainName, Latitude, Longitude, Speed, Timestamp, LocationName,
                                       EngineStatus, DepartureStation, DepartureTime, ArrivalStation,
                                       ArrivalTime, NextArrivalStation, NextArrivalTime, TripNo, Duration)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                Latitude = VALUES(Latitude),
                Longitude = VALUES(Longitude),
                Speed = VALUES(Speed),
                Timestamp = VALUES(Timestamp),
                LocationName = VALUES(LocationName),
                EngineStatus = VALUES(EngineStatus),
                DepartureStation = VALUES(DepartureStation),
                DepartureTime = VALUES(DepartureTime),
                ArrivalStation = VALUES(ArrivalStation),
                ArrivalTime = VALUES(ArrivalTime),
                NextArrivalStation = VALUES(NextArrivalStation),
                NextArrivalTime = VALUES(NextArrivalTime),
                TripNo = VALUES(TripNo),
                Duration = VALUES(Duration),
                UpdatedAt = CURRENT_TIMESTAMP;
        `;

        const values = [
            iotId, // Assuming IOTid is the same as iotId
            trainDetails.train_name,
            locationDetails.Latitude, // Placeholder for Latitude
            locationDetails.Longitude, // Placeholder for Longitude
            locationDetails.Speed, // Placeholder for Speed
            timestamp, // Placeholder for Timestamp
            locationDetails.LocationName, // Placeholder for LocationName
            locationDetails.EngineStatus,
            null, // Placeholder for DepartureStation
            departureTime,
            null, // Placeholder for ArrivalStation
            arrivalTime,
            null, // Placeholder for NextArrivalStation
            null, // Placeholder for NextArrivalTime
            trips.TripNo,
            trips.Duration
        ];

        await db.execute(sql, values);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function startDataAggregation() {
    while (true) {
        const activeIotDevices = await fetchActiveIotDevices();
        for (const iotId of activeIotDevices) {
            await fetchData(iotId);
        }
        await new Promise(resolve => setTimeout(resolve, 30000)); // Wait for 30 seconds before the next update
    }
}

startDataAggregation();
