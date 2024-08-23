const express = require('express');
const bodyParser = require('body-parser');
const routeRoutes = require('./routes/routeRoutes');
const tripRoutes = require('./routes/tripRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/routes', routeRoutes);
app.use('/trips', tripRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
