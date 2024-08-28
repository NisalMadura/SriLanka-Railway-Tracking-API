const RouteService = require('../services/RouteService');

const RouteController = {
    async createRoute(req, res) {
        try {
            const { lineID, departureStation, arrivalStation, stations } = req.body;
            const routeData = { LineID: lineID, DepartureStation: departureStation, ArrivalStation: arrivalStation };
            const route = await RouteService.createRoute(routeData, stations);
            res.status(201).json(route);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllRoutes(req, res) {
        try {
            const routes = await RouteService.getAllRoutes();
            res.status(200).json(routes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getRouteById(req, res) {
        try {
            const { id } = req.params;
            const route = await RouteService.getRouteById(id);
            if (!route) {
                return res.status(404).json({ error: 'Route not found' });
            }
            res.status(200).json(route);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    async updateRoute(req, res) {
        try {
            const { id } = req.params;
            const { lineID, departureStation, arrivalStation, stations } = req.body;
            const routeData = { LineID: lineID, DepartureStation: departureStation, ArrivalStation: arrivalStation };
            const updatedRoute = await RouteService.updateRoute(id, routeData, stations);
            if (!updatedRoute) {
                return res.status(404).json({ error: 'Route not found' });
            }
            res.status(200).json(updatedRoute);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteRoute(req, res) {
        try {
            const { id } = req.params;
            const result = await RouteService.deleteRoute(id);
            if (!result) {
                return res.status(404).json({ error: 'Route not found' });
            }
            res.status(204).send(); // No content
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

};

module.exports = RouteController;
