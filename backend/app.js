const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db.js");

const cors = require("cors");
const express = require("express");
const cookieparser = require("cookie-parser");
const app = express();

//kamlesh routes
const userRouters = require("./routes/userRoutes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes/admin.route.js");
const updateRotes = require("./routes/latestRoutes/latestUpdate.route.js");

// dilip routes
const collegeAuthRoutes = require("./routes/collegeRoutes/collegeAuthRoutes.js");
const collegeProfileRoutes = require("./routes/collegeRoutes/collegeProfileRoutes.js");
const collegeInfoRoutes = require("./routes/collegeRoutes/collegeInfoRoutes.js");
const branchRoutes = require("./routes/collegeRoutes/branchRoutes.js");

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
connectDB();

app.get("/", (req, res) => {
  res.send("Sab theek hai, aage chalooo");
});

// kamlesh routing
app.use("/user", userRouters);
app.use("/admin", adminRoutes);
app.use("/update", updateRotes);

app.use("/api/colleges-info", collegeInfoRoutes);
app.use("/api/colleges/auth", collegeAuthRoutes);
app.use("/api/college", collegeProfileRoutes);
app.use("/api/branches", branchRoutes);

module.exports = app;
