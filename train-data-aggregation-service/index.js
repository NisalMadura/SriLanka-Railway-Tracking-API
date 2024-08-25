const express = require('express');
const axios = require('axios');
const cors = require('cors');
const db = require('./db'); // Ensure this points to your database connection

const app = express();
const PORT = 3309; // You can choose any port that is free on your system

app.use(cors({
    origin: 'http://localhost:3001' // Allow requests from your frontend
  }));
  

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
        // Fetch data from train, trip, and location services
        const [trainResponse, tripResponse, locationResponse] = await Promise.all([
            axios.get(`${TRAIN_API_URL}${iotId}`),
            axios.get(`${TRIP_API_URL}${iotId}`),
            axios.get(`${LOCATION_API_URL}${iotId}`)
        ]);

        const trainData = trainResponse.data;
        const tripData = tripResponse.data;
        const locationData = locationResponse.data;

        // Ensure trainData and tripData are objects
        if (typeof trainData !== 'object' || typeof tripData !== 'object' || typeof locationData !== 'object') {
            console.error('Train, Trip, or Location data is not an object:', trainData, tripData, locationData);
            return;
        }

        // Extract data
        const locationDetails = locationData;
        const trainDetails = trainData;
        const trips = tripData.trips[0]; // Assuming there is at least one trip and we take the first one

        if (!trips) {
            console.error('No trips found for the given IOT ID:', iotId);
            return;
        }

        // Convert datetime values to MySQL format
        const departureTime = convertToMySQLDatetime(trips.DepartureTime);
        const arrivalTime = convertToMySQLDatetime(trips.ArrivalTime);
        const timestamp = convertToMySQLDatetime(locationDetails.Timestamp);

        // SQL Query to insert/update data
        const sql = `
            INSERT INTO RunningTrains (IOTid, TrainName, Latitude, Longitude, Speed, Timestamp, LocationName,
                                       EngineStatus, DepartureStation, DepartureTime, ArrivalStation,
                                       ArrivalTime, NextArrivalStation, NextArrivalTime, TripNo, Duration)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                TrainName = VALUES(TrainName),
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

        // Values for the query
        const values = [
            iotId,
            trainDetails.train_name,
            locationDetails.Latitude || null,
            locationDetails.Longitude || null,
            locationDetails.Speed || null,
            timestamp || null,
            locationDetails.LocationName || null,
            locationDetails.EngineStatus || null,
            null, // Placeholder for DepartureStation
            departureTime || null,
            null, // Placeholder for ArrivalStation
            arrivalTime || null,
            null, // Placeholder for NextArrivalStation
            null, // Placeholder for NextArrivalTime
            trips.TripNo || null,
            trips.Duration || null
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

// Start data aggregation
startDataAggregation();

app.get('/train-data', async (req, res) => {
    console.log('Received request for /train-data');
    try {
        const [rows] = await db.execute('SELECT * FROM RunningTrains');
        console.log('Data retrieved:', rows);
        res.json(rows);
    } catch (error) {
        console.error('Error retrieving train data:', error);
        res.status(500).json({ error: 'Error retrieving train data' });
    }
});


// Start Express server
app.listen(PORT, () => {
    console.log(`Data Aggregation Service is running on http://localhost:${PORT}`);
});
