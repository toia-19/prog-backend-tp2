const mysql = require("mysql2/promise");

const config = require("./../config");

// Generamos conexión con base de datos
const connection = mysql.createConnection({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password
})

// Obtenemos la conexión y la retornamos
const getConnection = () => {
    console.log("Conexión a la base de datos");
    return connection;
}

// Exportamos la conexión
module.exports = { getConnection };