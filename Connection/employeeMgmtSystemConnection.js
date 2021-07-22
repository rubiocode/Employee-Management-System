const mysql = require('mysql');

const connection= mysql.createConnection({

    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'password',
    database: 'employee_mgmt_systemDB',
});

module.exports= connection;