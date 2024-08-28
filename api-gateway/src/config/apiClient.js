// src/config/apiClient.js
const axios = require('axios');

// API client for the train service on port 3307
const trainApiClient = axios.create({
    baseURL: 'http://localhost:3307/api', // Train service base URL
    timeout: 1000,
});

// API client for the route service on port 3308
const routeApiClient = axios.create({
    baseURL: 'http://localhost:3308/api', // Route service base URL
    timeout: 1000,
});

module.exports = {
    trainApiClient,
    routeApiClient
};
