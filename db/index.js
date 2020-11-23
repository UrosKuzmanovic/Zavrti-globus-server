const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 100,
    password: 'Ukikuzma96Pi',
    user: 'uk',
    database: 'zavrtiglobus',
    host: 'localhost',
    port: '3306'
});

/*const pool = mysql.createPool({
    connectionLimit: 100,
    password: 'Ukikuzma96',
    user: 'root',
    database: 'zavrtiglobus',
    host: 'localhost',
    port: '3306'
});*/

module.exports = pool;