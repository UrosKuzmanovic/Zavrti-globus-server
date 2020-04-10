const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: 'Ukikuzma96',
    user: 'root',
    database: 'zavrtiglobus',
    host: 'localhost',
    port: '3306'
});

module.exports = pool;