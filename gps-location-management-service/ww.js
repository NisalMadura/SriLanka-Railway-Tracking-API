const express = require('express');
const bodyParser = require('body-parser');
const locationRoutes = require('./routes/locationRoutes');

// Create a function to initialize and start the server
const createServer = (port) => {
  const app = express();

  app.use(bodyParser.json());  // Parse JSON bodies
  app.use('/api/location', locationRoutes);  // Mount location routes

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

// Ports for the servers
//const PORT1 = process.env.PORT1 || 3000;
const PORT2 = process.env.PORT2 || 3001;

// Start servers on both ports
//createServer(PORT1);
createServer(PORT2);
