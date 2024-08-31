const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Route management service API',
    version: '1.0.0',
    description: 'API documentation for the Train Schedule microservice',
  },
  servers: [
    {
      url: 'http://localhost:3308', 
    },
  ],
};


const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './models/*.js'], 
};


const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
