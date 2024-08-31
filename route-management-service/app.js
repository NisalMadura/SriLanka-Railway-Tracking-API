const express = require('express');
const tripRoutes = require('./routes/tripRoutes');
const { swaggerUi, swaggerSpec } = require('./swagger');

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/trips', tripRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
