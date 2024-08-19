const sequelize = require('../config/database');
const connectMongoDB = require('../config/mongoConfig');
const Location = require('./location');
const LocationMongo = require('./locationMongo');

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connection has been established successfully.');
    await sequelize.sync(); // Sync models with the database
    console.log('MySQL database synced.');

  
    await connectMongoDB();
  } catch (error) {
    console.error('Unable to connect to the databases:', error);
  }
};

initDatabase();

module.exports = { Location, LocationMongo };
