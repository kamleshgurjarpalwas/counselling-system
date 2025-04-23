const mongoose = require("mongoose");

const collegeAuthSchema = new mongoose.Schema(
  {
    registrationId: { type: String, unique: true },
    collegeTag: { type: String, required: true },
    collegeId: { type: String, required: true, unique: true },
    collegeName: { type: String, required: true, unique: true },
    collegeMail: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // select false to avoid returning password by default
  },
  { timestamps: true }
);

module.exports = mongoose.model("CollegeAuth", collegeAuthSchema);
