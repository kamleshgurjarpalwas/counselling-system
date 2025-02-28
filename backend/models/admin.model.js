const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const admin = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true,,selected: false },
  phoneNumber: { type: Number },
  joinDate: { type: Date },
});

const admins = mongoose.model("Admin", admin);

module.export = admins;
