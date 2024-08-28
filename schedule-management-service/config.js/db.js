const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  logging: false, 
  dialectOptions: {
    ssl: {
      require: process.env.SSL_MODE === 'REQUIRED', 
      rejectUnauthorized: false 
    }
  }
});

module.exports = sequelize;
