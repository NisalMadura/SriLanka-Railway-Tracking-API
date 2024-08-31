const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

/**
 * @swagger
 * tags:
 *   name: Locations
 *   description: Manage and retrieve location data
 */

/**
 * @swagger
 * /train-name-by-iot-id/{iotId}:
 *   get:
 *     summary: Get the train name associated with an IoT ID
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: iotId
 *         schema:
 *           type: string
 *         required: true
 *         description: The IoT ID of the train
 *     responses:
 *       200:
 *         description: The name of the train associated with the IoT ID
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: Train not found for the given IoT ID
 */
router.get('/train-name-by-iot-id/:iotId', locationController.getTrainNameByIotId);

/**
 * @swagger
 * /all:
 *   get:
 *     summary: Retrieve all location entries
 *     tags: [Locations]
 *     responses:
 *       200:
 *         description: A list of all location entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 */
router.get('/all', locationController.getAllLocations);

/**
 * @swagger
 * /{iotId}:
 *   get:
 *     summary: Get a location entry by IoT ID
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: iotId
 *         schema:
 *           type: string
 *         required: true
 *         description: The IoT ID of the location entry
 *     responses:
 *       200:
 *         description: The location entry associated with the IoT ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found for the given IoT ID
 */
router.get('/:iotId', locationController.getLocationByIotId);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new location entry
 *     tags: [Locations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: The location entry was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Bad request
 */
router.post('/', locationController.createLocation);

module.exports = router;
