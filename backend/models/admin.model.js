const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const admin = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, selected: false },
  updates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Updates" }],
  // joinDate: { type: Date },
});

admin.plugin(AutoIncrement, { inc_field: "adminId", start_seq: 1000 });

admin.methods.genetrateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

admin.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

admin.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const admins = mongoose.model("Admin", admin);

module.exports = admins;
