const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const trainRoutes = require('./routes/trainRoutes');
const engineRoutes = require('./routes/engineRoutes');
const routeRoutes = require('./routes/routeRoutes');
const tripRoutes = require('./routes/tripRoutes');
const trainDataRoutes = require('./routes/trainDataRoutes');
const { checkJwt, checkAdminRole } = require('./middlewares/authMiddleware');

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(morgan('dev'));
app.use(express.json()); // Parse JSON bodies

// Register routes with authentication
app.use('/api', checkJwt, checkAdminRole, trainRoutes);
app.use('/api', checkJwt, checkAdminRole, engineRoutes);
app.use('/api/routes', checkJwt, checkAdminRole, routeRoutes);
app.use('/api/trips', checkJwt, checkAdminRole, tripRoutes);

// Register public routes (no authentication)
app.use('/train-data', trainDataRoutes);

module.exports = app;
