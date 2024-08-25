const express = require('express');
const tripRoutes = require('./routes/tripRoutes');

const app = express();

app.use(express.json());

// Registering trip routes
app.use('/api/trips', tripRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
