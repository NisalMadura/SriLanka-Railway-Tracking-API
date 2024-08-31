const express = require('express');
const RouteController = require('../controller/RouteController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: Route management and operations
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new route
 *     tags: [Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       201:
 *         description: The route was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       400:
 *         description: Bad request
 */
router.post('/', RouteController.createRoute);

/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Retrieve a list of routes
 *     tags: [Routes]
 *     responses:
 *       200:
 *         description: A list of routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Route'
 */
router.get('/routes', RouteController.getAllRoutes);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a route by its ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The route ID
 *     responses:
 *       200:
 *         description: The route details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       404:
 *         description: Route not found
 */
router.get('/:id', RouteController.getRouteById);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a route by its ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The route ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       200:
 *         description: The route was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       404:
 *         description: Route not found
 */
router.put('/:id', RouteController.updateRoute);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a route by its ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The route ID
 *     responses:
 *       204:
 *         description: The route was successfully deleted
 *       404:
 *         description: Route not found
 */
router.delete('/:id', RouteController.deleteRoute);

module.exports = router;
