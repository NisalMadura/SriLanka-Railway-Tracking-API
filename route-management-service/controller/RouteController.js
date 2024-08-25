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
    }
};

module.exports = RouteController;
