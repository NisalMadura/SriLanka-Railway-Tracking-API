// config/config.js

require('dotenv').config();

module.exports = {
  gpsServiceUrl: process.env.GPS_SERVICE_URL || 'http://localhost:3000/api/location',
  trainServicePort: process.env.TRAIN_SERVICE_PORT || 3307,
  routeServicePort: process.env.ROUTE_SERVICE_PORT || 3308,
  dataAggregationServicePort: process.env.DATA_AGGREGATION_SERVICE_PORT || 3309,
};
