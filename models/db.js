require("dotenv").config();
const { Pool, Client } = require("pg");

let connection;
//CREATE ROLE wachid29 WITH LOGIN PASSWORD 'pasword';
if (process.env.ENV_MODE === "prod") {
  connection = new Client({
    connectionString: process.env.DB_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  var port = process.env.PORT || 5432;
  connection = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: port,
  });
  console.log("Success connect to databases, port:", port);
}

connection.connect(function (err) {
  if (err) console.log("error", err);
});

//export module biar bisa digunakan ditempat lain
module.exports = connection;