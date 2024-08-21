const Train = require('../models/Train');

const TrainService = {
  async createTrain(trainData) {
    return Train.create(trainData);
  },

  async getAllTrains() {
    return Train.findAll();
  },

  async getTrain(train_no) {
    return Train.findByPk(train_no);
  },

  async updateTrain(train_no, trainData) {
    const train = await Train.findByPk(train_no);
    if (train) {
      return train.update(trainData);
    }
    return null;
  },

  async deleteTrain(train_no) {
    const train = await Train.findByPk(train_no);
    if (train) {
      await train.destroy();
      return true;
    }
    return false;
  },
};

module.exports = TrainService;
