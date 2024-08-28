const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const trainScheduleRoutes = require('./routes/trainScheduleRoutes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', trainScheduleRoutes);

module.exports = app;
