const Train = require('../models/Train');

const TrainController = {
    async createTrain(req, res) {
        try {
            const result = await Train.create(req.body);
            res.status(201).json({ success: true, message: 'Train created successfully', data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async getAllTrains(req, res) {
        try {
            const trains = await Train.findAll();
            res.status(200).json({ success: true, data: trains });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async getTrain(req, res) {
        try {
            const train = await Train.findById(req.params.train_no);
            if (train) {
                res.status(200).json({ success: true, data: train });
            } else {
                res.status(404).json({ success: false, message: 'Train not found' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async updateTrain(req, res) {
        try {
            const result = await Train.update(req.params.train_no, req.body);
            res.status(200).json({ success: true, message: 'Train updated successfully', data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async deleteTrain(req, res) {
        try {
            const result = await Train.delete(req.params.train_no);
            res.status(200).json({ success: true, message: 'Train deleted successfully', data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
};

module.exports = TrainController;
