const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectToDB = require("./DB/db.js");

app.use(cors());
connectToDB();

app.get("/", (req, res) => {
  res.send("hii");
});

module.exports = app;
