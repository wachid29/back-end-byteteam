require("dotenv").config();
const { Pool, Client } = require("pg");

var port = process.env.PORT || 5432;

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

module.exports = connection;