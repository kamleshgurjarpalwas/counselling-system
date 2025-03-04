const mongoose = require("mongoose");

const branchDetailSchema = new mongoose.Schema({
  branchId: { type: String, required: true, unique: true },
  branchName: { type: String, required: true },
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  restrictions: {
    pwd: { type: Boolean, default: false },
    other: { type: String, default: "" },
  },
});

module.exports = mongoose.model("Branch", branchDetailSchema);
