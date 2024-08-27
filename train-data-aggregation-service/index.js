const express = require('express');
const axios = require('axios');
const cors = require('cors');
const db = require('./db'); 

const app = express();
const PORT = 3309; 

app.use(cors({
    origin: 'http://localhost:3001' 
  }));
  

const TRIP_API_URL = 'http://localhost:3308/api/trips/by-iot-id/';
const TRAIN_API_URL = 'http://localhost:3307/api/by-iot-id/';
const LOCATION_API_URL = 'http://localhost:3000/api/location/';
const moment = require('moment-timezone'); 

// Function to convert ISO 8601 datetime to MySQL DATETIME format
function convertToMySQLDatetime(isoDate) {
    if (!isoDate) return null;
    return new Date(isoDate).toISOString().slice(0, 19).replace('T', ' ');
}

async function fetchActiveIotDevices() {
    const [rows] = await db.execute('SELECT IOTid FROM iotdevicestatus WHERE Status = 1');
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
        const trips = tripData.trips[0]; 

        if (!trips) {
            console.error('No trips found for the given IOT ID:', iotId);
            return;
        }

        const departureTime = moment.tz(trips.DepartureTime, 'Asia/Colombo');

        // Calculate the arrival time by adding the duration to the departure time
        let arrivalTime = null;
        if (departureTime && trips.Duration) {
            const durationParts = trips.Duration.split(':').map(Number);
            arrivalTime = departureTime
                .clone()
                .add(durationParts[0], 'hours')
                .add(durationParts[1], 'minutes')
                .add(durationParts[2], 'seconds');
        }

        // Format departure and arrival times for MySQL
        const formattedDepartureTime = convertToMySQLDatetime(departureTime.toDate());
        const formattedArrivalTime = convertToMySQLDatetime(arrivalTime ? arrivalTime.toDate() : null);
        const timestamp = convertToMySQLDatetime(moment.tz(locationDetails.Timestamp, 'Asia/Colombo').toDate());

        
        const sql = `
            INSERT INTO runningtrains (IOTid, TrainName, Latitude, Longitude, Speed, Timestamp, LocationName,
                                       EngineStatus, DepartureTime, 
                                       ArrivalTime, NextArrivalStation, NextArrivalTime, TripNo, Duration)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                TrainName = VALUES(TrainName),
                Latitude = VALUES(Latitude),
                Longitude = VALUES(Longitude),
                Speed = VALUES(Speed),
                Timestamp = VALUES(Timestamp),
                LocationName = VALUES(LocationName),
                EngineStatus = VALUES(EngineStatus),
                
                DepartureTime = VALUES(DepartureTime),
               
                ArrivalTime = VALUES(ArrivalTime),
                NextArrivalStation = VALUES(NextArrivalStation),
                NextArrivalTime = VALUES(NextArrivalTime),
                TripNo = VALUES(TripNo),
                Duration = VALUES(Duration),
                UpdatedAt = CURRENT_TIMESTAMP;
        `;

        
        const values = [
            iotId,
            trainDetails.train_name,
            locationDetails.Latitude || null,
            locationDetails.Longitude || null,
            locationDetails.Speed || null,
            timestamp || null,
            locationDetails.LocationName || null,
            locationDetails.EngineStatus || null,
           
            formattedDepartureTime || null,
            formattedArrivalTime || null,
            null, 
            null, 
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
        await new Promise(resolve => setTimeout(resolve, 30000)); 
    }
}


startDataAggregation();

app.get('/train-data', async (req, res) => {
    console.log('Received request for /train-data');
    try {
        const [rows] = await db.execute('SELECT * FROM runningtrains');
        console.log('Data retrieved:', rows);
        res.json(rows);
    } catch (error) {
        console.error('Error retrieving train data:', error);
        res.status(500).json({ error: 'Error retrieving train data' });
    }
});



app.listen(PORT, () => {
    console.log(`Data Aggregation Service is running on http://localhost:${PORT}`);
});
