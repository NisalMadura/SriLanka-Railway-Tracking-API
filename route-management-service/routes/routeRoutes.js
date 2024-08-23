const express = require('express');
const RouteController = require('../controllers/RouteController');

const router = express.Router();

router.post('/', RouteController.createRoute);
router.get('/', RouteController.getAllRoutes);
router.get('/:id', RouteController.getRouteById);

module.exports = router;
