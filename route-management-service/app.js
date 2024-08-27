const express = require('express');
const tripRoutes = require('./routes/tripRoutes');

const app = express();

app.use(express.json());


app.use('/api/trips', tripRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
