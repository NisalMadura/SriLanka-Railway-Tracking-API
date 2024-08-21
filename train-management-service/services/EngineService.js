const Engine = require('../models/Engine');

const EngineService = {
  async createEngine(engineData) {
    return Engine.create(engineData);
  },

  async getAllEngines() {
    return Engine.findAll();
  },

  async getEngine(engine_no) {
    return Engine.findByPk(engine_no);
  },

  async updateEngine(engine_no, engineData) {
    const engine = await Engine.findByPk(engine_no);
    if (engine) {
      return engine.update(engineData);
    }
    return null;
  },

  async deleteEngine(engine_no) {
    const engine = await Engine.findByPk(engine_no);
    if (engine) {
      await engine.destroy();
      return true;
    }
    return false;
  },
};

module.exports = EngineService;
