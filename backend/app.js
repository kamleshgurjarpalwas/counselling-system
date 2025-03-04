const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const express = require("express");
const cookieparser = require("cookie-parser");
const app = express();
const connectDB  = require("./config/db.js");

const userRouters = require('./routes/userRoutes.js')

const collegeAuthRoutes = require("./routes/collegeRoutes/collegeAuthRoutes.js")
const collegeProfileRoutes = require("./routes/collegeRoutes/collegeProfileRoutes.js")
const collegeInfoRoutes = require('./routes/collegeRoutes/collegeInfoRoutes.js')
const branchRoutes = require('./routes/branchRoutes.js')

app.use(cors());
app.use(express.json());
app.use(cookieparser());
connectDB ();

app.use("/user",userRouters);
app.use("/api/colleges-info", collegeInfoRoutes);
app.use("/api/colleges/auth", collegeAuthRoutes);
app.use("/api/college", collegeProfileRoutes);
app.use("/api/branches", branchRoutes);

app.get("/", (req, res) => {
  res.send("Sab theek hai, aage chalooo");
});

module.exports = app;
