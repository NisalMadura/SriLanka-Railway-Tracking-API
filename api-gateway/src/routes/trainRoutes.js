const express = require('express');
const router = express.Router();
const { trainApiClient } = require('../config/apiClient');

// Route to create a train
router.post('/trains', async (req, res) => {
  try {
    const response = await trainApiClient.post('/trains', req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
});

// Route to get all trains
router.get('/trains', async (req, res) => {
  try {
    const response = await trainApiClient.get('/trains');
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
});

// Route to get a specific train
router.get('/trains/:train_no', async (req, res) => {
  try {
    const response = await trainApiClient.get(`/trains/${req.params.train_no}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
});

// Route to update a specific train
router.put('/trains/:train_no', async (req, res) => {
  try {
    const response = await trainApiClient.put(`/trains/${req.params.train_no}`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
});

// Route to delete a specific train
router.delete('/trains/:train_no', async (req, res) => {
  try {
    const response = await trainApiClient.delete(`/trains/${req.params.train_no}`);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
});

module.exports = router;
