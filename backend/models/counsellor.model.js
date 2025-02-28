const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const counsellor = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,selected: false },
  password: { type: String, required: true },
  phoneNumber: { type: Number },
  college: { type: mongoose.Schema.Type.ObjectId, ref: "College" },
  workingHours: {
    start: { type: String },
    end: { type: String },
  },
});

const counsellors = mongoose.model("Counsellor", counsellor);

module.export = counsellors;
