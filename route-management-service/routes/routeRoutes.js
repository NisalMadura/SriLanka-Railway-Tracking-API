const express = require('express');
const RouteController = require('../controller/RouteController');

const router = express.Router();

router.post('/', RouteController.createRoute);
router.get('/routes', RouteController.getAllRoutes);
router.get('/:id', RouteController.getRouteById);
router.put('/:id', RouteController.updateRoute); // Added PUT route
router.delete('/:id', RouteController.deleteRoute);

module.exports = router;
