require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.API_PORT || 8000;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
// app.use(cors())

const corsOptions = {
  origins: "http://localhost:3000",
};

app.use(helmet({ crossOriginResourcePolicy: false }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express static
// app.use("/profiles", express.static("profiles"));
app.use("/images", express.static("images"));
// app.use("/company", express.static("company"));

// define ticket Route
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");
const ticketRoute = require("./routes/ticketRoute");
const placeRoute = require("./routes/placeRoute");
const maskapaiRoute = require("./routes/maskapaiRoute");

app.use("/auth", cors(corsOptions), authRoute);
app.use("/user", cors(corsOptions), userRoute);
app.use("/booking", cors(corsOptions), bookingRoute);
app.use("/", cors(corsOptions), ticketRoute);
app.use("/", cors(corsOptions), placeRoute);
app.use("/", cors(corsOptions), maskapaiRoute);
// define place Route
const facilityRoute = require("./routes/facilityRoute");
app.use("/", cors(corsOptions), facilityRoute);
// define place Route
const stockRoute = require("./routes/stockRoute");
app.use("/", cors(corsOptions), stockRoute);

// Notes code by Mas Wachid
const exRoute = require("./routes/exRoute");
app.use("/", cors(corsOptions), exRoute);

// For check deploy
// app.use("*", (req, res) => { res.send("Success to connect to your REST API"); });

app.listen(port, (err) => {
  if (err) throw err;
  console.log("REST API running on port:", port);
});
