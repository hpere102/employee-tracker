const mysql = require('mysql2');

// connect to db
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'iSkate37',
        database: 'company'
    },
    console.log('Connected to company database.')
);

module.exports = db;