// src/routes/tripRoutes.js

const express = require('express');
const axios = require('axios');

const router = express.Router();
const TRIP_SERVICE_URL = 'http://localhost:3308/api/trips';

// Create a new trip
router.post('/', async (req, res) => {
    try {
        const response = await axios.post(`${TRIP_SERVICE_URL}`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

// Get all trips
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${TRIP_SERVICE_URL}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

// Get a trip by ID
router.get('/:id', async (req, res) => {
    try {
        const response = await axios.get(`${TRIP_SERVICE_URL}/${req.params.id}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

// Get trip details by IoT ID
router.get('/by-iot-id/:iotId', async (req, res) => {
    try {
        const response = await axios.get(`${TRIP_SERVICE_URL}/by-iot-id/${req.params.iotId}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

module.exports = router;
