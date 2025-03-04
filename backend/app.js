const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const cookieparser = require("cookie-parser");
const app = express();
const connectToDB = require("./config/db.js");
const userRouters = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/admin.route.js");
const updateRotes = require("./routes/latestUpdate.route.js");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
connectToDB();

app.get("/", (req, res) => {
  res.send("hii");
});

app.use("/user", userRouters);
app.use("/admin", adminRoutes);
app.use("/update", updateRotes);

module.exports = app;
