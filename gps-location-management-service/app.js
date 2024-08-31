const express = require('express');
const bodyParser = require('body-parser');
const locationRoutes = require('./routes/locationRoutes');
const sequelize = require('./config/database'); 
require('./config/mongodb'); 
const { swaggerUi, swaggerSpec } = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.json());  
app.use('/api/location', locationRoutes);  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
