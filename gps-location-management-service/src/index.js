// src/index.js
const express = require('express');
const sequelize = require('../config/db');
const locationRoutes = require('../routes/locationRoutes');

const app = express();
app.use(express.json());
app.use('/api', locationRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`GPS Location Management Service running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Unable to connect to the database:', err);
});
