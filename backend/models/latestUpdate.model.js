const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const update = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    doneBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamp: true }
);

const updates = mongoose.model("Updates", update);

module.exports = updates;
