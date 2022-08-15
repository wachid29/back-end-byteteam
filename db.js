const { Pool, Client } = require("pg");
require("dotenv").config();

let connection;
console.log("process.env.ENV_MODE", process.env.ENV_MODE);
//CREATE ROLE wachid29 WITH LOGIN PASSWORD 'pasword';
if (process.env.ENV_MODE === "prod") {
  connection = new Client({
    connectionString: process.env.DB_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  connection = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT2,
  });
}

connection.connect(function (err) {
  if (err) console.log("error", err);
});
// //export module biar bisa digunakan ditempat lain
module.exports = connection;
