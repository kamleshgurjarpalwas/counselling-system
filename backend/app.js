const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const cookieparser = require("cookie-parser");
const app = express();
const connectToDB = require("./config/db.js");
const userRouters = require('./routes/userRoutes.js')

app.use(cors());
app.use(express.json());
app.use(cookieparser());
connectToDB();

app.use("/user",userRouters);

app.get("/", (req, res) => {
  res.send("hii");
});

module.exports = app;
