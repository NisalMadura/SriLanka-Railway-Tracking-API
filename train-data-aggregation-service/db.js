const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'db-mysql-sgp1-63819-do-user-17008758-0.d.db.ondigitalocean.com',  
    user: 'doadmin',
    password: 'AVNS_ctASq61Myj-3FiavvRV',
    database: 'data_aggregation_db',  
    port: 25060, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


module.exports = pool.promise();
