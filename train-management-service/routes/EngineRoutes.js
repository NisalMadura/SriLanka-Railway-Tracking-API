const express = require('express');
const EngineController = require('../controllers/EngineController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Engines
 *   description: Engine management and operations
 */

/**
 * @swagger
 * /engines:
 *   post:
 *     summary: Create a new engine
 *     tags: [Engines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Engine'
 *     responses:
 *       201:
 *         description: The engine was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Engine'
 *       400:
 *         description: Bad request
 */
router.post('/engines', EngineController.createEngine);

/**
 * @swagger
 * /engines:
 *   get:
 *     summary: Retrieve a list of engines
 *     tags: [Engines]
 *     responses:
 *       200:
 *         description: A list of engines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Engine'
 */
router.get('/engines', EngineController.getAllEngines);

/**
 * @swagger
 * /engines/{engine_no}:
 *   get:
 *     summary: Get an engine by its engine number
 *     tags: [Engines]
 *     parameters:
 *       - in: path
 *         name: engine_no
 *         schema:
 *           type: string
 *         required: true
 *         description: The engine number
 *     responses:
 *       200:
 *         description: The engine details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Engine'
 *       404:
 *         description: Engine not found
 */
router.get('/engines/:engine_no', EngineController.getEngine);

/**
 * @swagger
 * /engines/{engine_no}:
 *   put:
 *     summary: Update an engine by its engine number
 *     tags: [Engines]
 *     parameters:
 *       - in: path
 *         name: engine_no
 *         schema:
 *           type: string
 *         required: true
 *         description: The engine number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Engine'
 *     responses:
 *       200:
 *         description: The engine was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Engine'
 *       404:
 *         description: Engine not found
 */
router.put('/engines/:engine_no', EngineController.updateEngine);

/**
 * @swagger
 * /engines/{engine_no}:
 *   delete:
 *     summary: Delete an engine by its engine number
 *     tags: [Engines]
 *     parameters:
 *       - in: path
 *         name: engine_no
 *         schema:
 *           type: string
 *         required: true
 *         description: The engine number
 *     responses:
 *       204:
 *         description: The engine was successfully deleted
 *       404:
 *         description: Engine not found
 */
router.delete('/engines/:engine_no', EngineController.deleteEngine);

module.exports = router;
