const mysql = require("mysql2/promise"); // 👈 versão com promessas
require('dotenv').config();

// Conexão com o banco MySQL (pool com promessas)
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = db;