const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema({
  id: { type: Schema.Types.ObjectId, ref: "User" },
  choiceId: { type: Schema.Types.ObjectId, ref: "branchSchema" },
  usedCat: { type: String },
});

module.exports.result = new mongoose.model("result", resultSchema);
