const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const collegeAuthSchema = new mongoose.Schema({
  registrationId: { type: String, unique: true },
  collegeTag: { type: String, unique: true },
  collegeId: { type: String, required: true, unique: true },
  collegeName: { type: String, required: true, unique: true },
  collegeMail: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
}, { timestamps: true });


collegeAuthSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("CollegeAuth", collegeAuthSchema);
