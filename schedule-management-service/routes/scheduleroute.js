const express = require('express');
const TrainScheduleController = require('./controllers/trainScheduleController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: TrainSchedules
 *   description: Manage train schedules
 */

/**
 * @swagger
 * /train-schedules:
 *   post:
 *     summary: Create a new train schedule
 *     tags: [TrainSchedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainSchedule'
 *     responses:
 *       201:
 *         description: Train schedule created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainSchedule'
 *       400:
 *         description: Invalid input
 */
router.post('/train-schedules', TrainScheduleController.createTrainSchedule);

/**
 * @swagger
 * /train-schedules:
 *   get:
 *     summary: Retrieve all train schedules
 *     tags: [TrainSchedules]
 *     responses:
 *       200:
 *         description: List of train schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainSchedule'
 *       500:
 *         description: Internal server error
 */
router.get('/train-schedules', TrainScheduleController.getAllTrainSchedules);

/**
 * @swagger
 * /train-schedules/{id}:
 *   get:
 *     summary: Retrieve a train schedule by ID
 *     tags: [TrainSchedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the train schedule
 *     responses:
 *       200:
 *         description: Train schedule details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainSchedule'
 *       404:
 *         description: Train schedule not found
 */
router.get('/train-schedules/:id', TrainScheduleController.getTrainScheduleById);

/**
 * @swagger
 * /train-schedules/{id}:
 *   put:
 *     summary: Update a train schedule by ID
 *     tags: [TrainSchedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the train schedule
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TrainSchedule'
 *     responses:
 *       200:
 *         description: Train schedule updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainSchedule'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Train schedule not found
 */
router.put('/train-schedules/:id', TrainScheduleController.updateTrainSchedule);

/**
 * @swagger
 * /train-schedules/{id}:
 *   delete:
 *     summary: Delete a train schedule by ID
 *     tags: [TrainSchedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the train schedule
 *     responses:
 *       204:
 *         description: Train schedule deleted
 *       404:
 *         description: Train schedule not found
 */
router.delete('/train-schedules/:id', TrainScheduleController.deleteTrainSchedule);

module.exports = router;
