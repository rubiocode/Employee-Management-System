// required dependency
const mysql = require('mysql');


// stablishing MySQL connection. Always use given port 3306 
const connection= mysql.createConnection({

    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'password',
    database: 'employee_mgmt_systemDB',
});


// Export module connection
module.exports= connection;