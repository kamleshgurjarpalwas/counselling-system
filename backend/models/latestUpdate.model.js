const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const update = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    doneBy: { type: String, required: true },
    tags: [
      {
        tagName: { type: String }
      }
    ]
  },
  { timestamp: true }
);

const updates = mongoose.model("Update", update);

module.export = updates;
