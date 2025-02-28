const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collegeSchema = new Schema(
  {
    collegeName: { type: String, required: true },
    collageMail: { type: String, required: true },
    password: { type: String, required: true, selected: false },
    address: {
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    branchs: [
      {
        _id: { type: Schema.Types.ObjectId, auto: true },
        branch: { type: Schema.Types.ObjectId, ref: "Branch" },
        seats: { type: Number, required: true },
        otherState: {
          gen: { seat: { type: Number, required: true },
		 or: { type: Number, required: true },
		 cr: {type: Number, required: true}
	 },
          obc: { seat: { type: Number, required: true },
		 or: { type: Number, required: true },
		 cr: {type: Number, required: true}
	 },
          ews: { seat: { type: Number, required: true },
		 or: { type: Number, required: true },
		 cr: {type: Number, required: true}
	 },
          sc: { seat: { type: Number, required: true },
		 or: { type: Number, required: true },
		 cr: {type: Number, required: true}
	 },
          st: { seat: { type: Number, required: true },
		 or: { type: Number, required: true },
		 cr: {type: Number, required: true}
	 },
        },
        homeState: {
          gen: { seat: { type: Number, required: true },
		 or: { type: Number, required: true },
		 cr: {type: Number, required: true}
	 },
          obc: { seat: { type: Number, required: true },
		 or: { type: Number, required: true },
		 cr: {type: Number, required: true}
	 },
          ews: { seat: { type: Number, required: true },
		 or: { type: Number, required: true },
		 cr: {type: Number, required: true}
	 },
          sc: { seat: { type: Number, required: true },
		 or: { type: Number, required: true },
		 cr: {type: Number, required: true}
	 },
          st: { seat: { type: Number, required: true },
		 or: { type: Number, required: true },
		 cr: {type: Number, required: true}
	 },
        },
      },
    ],
    restrictions: {
      pwd: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

const colleges = mongoose.model("College", collegeSchema);

module.exports = colleges;
