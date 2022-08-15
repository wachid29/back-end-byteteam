const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8010;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");

// const { options } = require("pg/lib/defaults");
const userRoutes = require("./routes/userRoutes");

const corsOptions = {
  origins: "http://localhost:3000",
};

// app.use(cors())

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/profiles", express.static("profiles"));
app.use("/images", express.static(`images`));
app.use("/company", express.static(`company`));
// Define all routes
app.use("/", cors(corsOptions), userRoutes);

app.use("*", (req, res) => {
  res.send("sukses");
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log("fighting", port);
});
