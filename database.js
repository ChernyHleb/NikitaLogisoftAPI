require('dotenv').config();

const db = require("./models");
db.sequelize.sync();

module.exports = db;

//////////////////////////////////////////
//const { createPool } = require('mysql');
// connection for RAW queries
// const pool = createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     connectionLimit: 10
// });
// module.exports = pool;
//////////////////////////////////////////

