const express = require('express');
const userRoutes = require('./routes/userRoutes');
const { swaggerUi, swaggerSpec } = require('./swagger');


const app = express();
app.use(express.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', userRoutes);

app.listen(3303, () => {
    console.log('User management service running on port 3303');
});
