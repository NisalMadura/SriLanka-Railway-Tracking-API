const Engine = require('../models/Engine');

const EngineController = {
    async createEngine(req, res) {
        try {
            const result = await Engine.create(req.body);
            res.status(201).json({ success: true, message: 'Engine created successfully', data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async getAllEngines(req, res) {
        try {
            const engines = await Engine.findAll();
            res.json(engines);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async getEngine(req, res) {
        try {
            const engine = await Engine.findById(req.params.engine_no);
            if (engine) {
                res.status(200).json({ success: true, data: engine });
            } else {
                res.status(404).json({ success: false, message: 'Engine not found' });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async updateEngine(req, res) {
        try {
            const result = await Engine.update(req.params.engine_no, req.body);
            res.status(200).json({ success: true, message: 'Engine updated successfully', data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async deleteEngine(req, res) {
        try {
            const result = await Engine.delete(req.params.engine_no);
            res.status(200).json({ success: true, message: 'Engine deleted successfully', data: result });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
};

module.exports = EngineController;
