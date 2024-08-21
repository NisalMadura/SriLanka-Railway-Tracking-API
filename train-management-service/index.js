const express = require('express');
const trainRoutes = require('./routes/TrainRoutes');
const engineRoutes = require('./routes/EngineRoutes');

const app = express();

app.use(express.json());

app.use('/api', trainRoutes);
app.use('/api', engineRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
