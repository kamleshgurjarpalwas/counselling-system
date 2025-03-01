const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, selected: false },
  address: { type: String, required: true },
  roll: { type: Number, required: true, unique: true },
  rank: { type: Number, required: true, unique: true },
  category: { type: String, default: "Gen" },
  advRank: { type: Boolean, unique: true },
  fatherName: { type: String, required: true },
  isRegistered: { type: Boolean, default: false },
  lastLogin: { type: String, required: true },
  verificationStatus: { type: Boolean, default: false },
  query: { type: String },
  allotedChoice: { type: Schema.Types.ObjectId, ref: "College" },
  currentStatus: { type: String, enum: ["float", "slide", "freez"] },
  feeStatus: {
    regFee: { type: Number },
    acceptFee: { type: Number },
  },
});

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

user = mongoose.model("User", userSchema);

module.exports = user;
