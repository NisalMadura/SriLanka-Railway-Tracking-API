const http = require('http');
const app = require('./app');
const sequelize = require('./config/database');

const port = process.env.PORT || 3306;
const server = http.createServer(app);

sequelize.sync().then(() => {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
