const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('train_management_db', 'root', 'Cola@i3', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
