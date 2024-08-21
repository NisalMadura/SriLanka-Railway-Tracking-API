const express = require('express');
const EngineController = require('../controllers/EngineController');

const router = express.Router();

router.post('/engines', EngineController.createEngine);
router.get('/engines', EngineController.getAllEngines);
router.get('/engines/:engine_no', EngineController.getEngine);
router.put('/engines/:engine_no', EngineController.updateEngine);
router.delete('/engines/:engine_no', EngineController.deleteEngine);

module.exports = router;
