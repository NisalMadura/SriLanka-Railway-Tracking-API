const express = require('express');
const TrainController = require('../controllers/TrainController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Trains
 *   description: Train management and operations
 */

/**
 * @swagger
 * /trains:
 *   post:
 *     summary: Create a new train
 *     tags: [Trains]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Train'
 *     responses:
 *       201:
 *         description: The train was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Train'
 *       400:
 *         description: Bad request
 */
router.post('/trains', TrainController.createTrain);

/**
 * @swagger
 * /trains:
 *   get:
 *     summary: Retrieve a list of trains
 *     tags: [Trains]
 *     responses:
 *       200:
 *         description: A list of trains
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Train'
 */
router.get('/trains', TrainController.getAllTrains);

/**
 * @swagger
 * /trains/{train_no}:
 *   get:
 *     summary: Get a train by its train number
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: train_no
 *         schema:
 *           type: string
 *         required: true
 *         description: The train number
 *     responses:
 *       200:
 *         description: The train details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Train'
 *       404:
 *         description: Train not found
 */
router.get('/trains/:train_no', TrainController.getTrain);

/**
 * @swagger
 * /trains/{train_no}:
 *   put:
 *     summary: Update a train by its train number
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: train_no
 *         schema:
 *           type: string
 *         required: true
 *         description: The train number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Train'
 *     responses:
 *       200:
 *         description: The train was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Train'
 *       404:
 *         description: Train not found
 */
router.put('/trains/:train_no', TrainController.updateTrain);

/**
 * @swagger
 * /trains/{train_no}:
 *   delete:
 *     summary: Delete a train by its train number
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: train_no
 *         schema:
 *           type: string
 *         required: true
 *         description: The train number
 *     responses:
 *       204:
 *         description: The train was successfully deleted
 *       404:
 *         description: Train not found
 */
router.delete('/trains/:train_no', TrainController.deleteTrain);

/**
 * @swagger
 * /by-iot-id/{iotId}:
 *   get:
 *     summary: Get a train by its IoT ID
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: iotId
 *         schema:
 *           type: string
 *         required: true
 *         description: The IoT ID of the train
 *     responses:
 *       200:
 *         description: The train details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Train'
 *       404:
 *         description: Train not found
 */
router.get('/by-iot-id/:iotId', TrainController.getTrainByIotId);

module.exports = router;
