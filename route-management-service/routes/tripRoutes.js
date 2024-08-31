const express = require('express');
const TripController = require('../controller/TripController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Trips
 *   description: Trip management and operations
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new trip
 *     tags: [Trips]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       201:
 *         description: The trip was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       400:
 *         description: Bad request
 */
router.post('/', TripController.createTrip);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of trips
 *     tags: [Trips]
 *     responses:
 *       200:
 *         description: A list of trips
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 */
router.get('/', TripController.getAllTrips);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a trip by its ID
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The trip ID
 *     responses:
 *       200:
 *         description: The trip details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       404:
 *         description: Trip not found
 */
router.get('/:id', TripController.getTripById);

/**
 * @swagger
 * /by-iot-id/{iotId}:
 *   get:
 *     summary: Get trip details by IoT ID
 *     tags: [Trips]
 *     parameters:
 *       - in: path
 *         name: iotId
 *         schema:
 *           type: string
 *         required: true
 *         description: The IoT ID associated with the trip
 *     responses:
 *       200:
 *         description: The trip details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       404:
 *         description: Trip not found
 */
router.get('/by-iot-id/:iotId', TripController.getTripDetailsByIotId);

module.exports = router;
