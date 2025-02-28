const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const branchSchema = new Schema({
  branchName: { type: String, required: true },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  restrictions: {
    pwd: { type: Boolean, default: false },
    other: { type: String, default: false },
  },
});

const Branch = mongoose.model("Branch", branchSchema);
module.exports = Branch;
