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

app.use(helmet ({ crossOriginResourcePolicy: false, }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Express static
app.use("/profiles", express.static("profiles"));
app.use("/images", express.static(`images`));
app.use("/company", express.static(`company`));

// Define all routes
const authRoute = require("./routes/userRoute");
const userRoute = require("./routes/userRoute");

app.use("/", cors(corsOptions), authRoute);
app.use("/", cors(corsOptions), userRoute);


// For check deploy
app.use("*", (req, res) => { res.send("Success to connect to your REST API"); });

app.listen(port, (err) => {
  if (err) throw err;
  console.log("REST API running on port:", port);
});
