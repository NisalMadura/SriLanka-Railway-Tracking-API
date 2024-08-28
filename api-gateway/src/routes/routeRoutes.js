const express = require('express');
const router = express.Router();
const { routeApiClient } = require('../config/apiClient');

// Route to create a route
router.post('/routes', async (req, res) => {
    try {
        const response = await routeApiClient.post('/routes', req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

// Route to get all routes
router.get('/routes', async (req, res) => {
    try {
        const response = await routeApiClient.get('/routes');
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

// Route to get a specific route
router.get('/routes/:id', async (req, res) => {
    try {
        const response = await routeApiClient.get(`/routes/${req.params.id}`);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

// Route to update a specific route
router.put('/routes/:id', async (req, res) => {
    try {
        const response = await routeApiClient.put(`/routes/${req.params.id}`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

// Route to delete a specific route
router.delete('/routes/:id', async (req, res) => {
    try {
        const response = await routeApiClient.delete(`/routes/${req.params.id}`);
        res.status(response.status).send(); // No content
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ message: error.message });
    }
});

module.exports = router;
