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
    },
    async updateRoute(routeId, routeData, stations) {
        const route = await Route.findByPk(routeId); 
        if (route) {
            await route.update(routeData);

            // Clear existing stations
            await RouteStation.destroy({ where: { RouteID: routeId } });

            // Add updated stations
            for (let i = 0; i < stations.length; i++) {
                await RouteStation.create({
                    RouteID: routeId,
                    StationID: stations[i],
                    Sequence: i + 1
                });
            }

            return route;
        }
        return null;
    },

    async deleteRoute(routeId) {
        const route = await Route.findByPk(routeId); 
        if (route) {
            await RouteStation.destroy({ where: { RouteID: routeId } });
            await route.destroy();
            return true;
        }
        return false;
    }

};

module.exports = RouteService;
