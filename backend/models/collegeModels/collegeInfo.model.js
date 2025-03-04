const mongoose = require("mongoose");

const rankSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
  openingRank: { type: Number },
  closingRank: { type: Number },
});

const branchSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
  branchDetails: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
  otherState: {
    gen: [{ type: rankSchema }],
    obc: [{ type: rankSchema }],
    ews: [{ type: rankSchema }],
    sc: [{ type: rankSchema }],
    st: [{ type: rankSchema }],
  },
  homeState: {
    gen: [{ type: rankSchema }],
    obc: [{ type: rankSchema }],
    ews: [{ type: rankSchema }],
    sc: [{ type: rankSchema }],
    st: [{ type: rankSchema }],
  },
});

const collegeSchema = new mongoose.Schema(
  {
    tag: { type: String,},  
    collegeId: { type: String, required: true, unique: true },
    collegeName: { type: String, required: true, unique: true },
    address: {
      city: { type: String, default: "" },  
      state: { type: String, default: "" },
    },
    branches: { type: [branchSchema], default: [] },  
    restrictions: {
      pwd: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("College", collegeSchema);

