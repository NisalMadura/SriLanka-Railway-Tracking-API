const express = require('express');
const axios = require('axios');

const router = express.Router();

const DATA_AGGREGATION_URL = 'http://localhost:3309/train-data';

// Route to fetch aggregated train data
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(DATA_AGGREGATION_URL);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching train data from aggregation service:', error);
        res.status(500).json({ error: 'Error fetching train data' });
    }
});

module.exports = router;
