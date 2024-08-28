const express = require('express');
const router = express.Router();
const { trainApiClient }  = require('../config/apiClient');

// Route to create an engine
router.post('/engines', async (req, res) => {
  try {
    const response = await trainApiClient.post('/engines', req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
});

// Route to get all engines
router.get('/engines', async (req, res) => {
  try {
    const response = await trainApiClient.get('/engines');
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
});

// Route to get a specific engine
router.get('/engines/:engine_no', async (req, res) => {
  try {
    const response = await trainApiClient.get(`/engines/${req.params.engine_no}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
});

// Route to update a specific engine
router.put('/engines/:engine_no', async (req, res) => {
  try {
    const response = await trainApiClient.put(`/engines/${req.params.engine_no}`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
});

// Route to delete a specific engine
router.delete('/engines/:engine_no', async (req, res) => {
  try {
    const response = await trainApiClient.delete(`/engines/${req.params.engine_no}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
});

module.exports = router;
