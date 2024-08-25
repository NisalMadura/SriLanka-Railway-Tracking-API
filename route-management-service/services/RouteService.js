const Route = require('../models/Route');
const RouteStation = require('../models/RouteStation');

const RouteService = {
    async createRoute(routeData, stations) {
        const route = await Route.create(routeData);

        for (let i = 0; i < stations.length; i++) {
            await RouteStation.create({
                RouteID: route.insertId,
                StationID: stations[i],
                Sequence: i + 1
            });
        }

        return route;
    },

    async getAllRoutes() {
        return await Route.findAll();
    },

    async getRouteById(routeId) {
        const route = await Route.findById(routeId);
        const stations = await RouteStation.findAllByRoute(routeId);
        return { route, stations };
    }
};

module.exports = RouteService;
