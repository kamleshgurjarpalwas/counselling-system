const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/SE")
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => console.log(err));

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false },
  address: { type: String, required: true },
  roll: { type: Number, required: true, unique: true },
  rank: { type: Number, required: true, unique: true },
  category: { type: String, default: "Gen" },
  advRank: { type: Boolean, unique: true, sparse: true },
  fatherName: { type: String, required: true },
  isRegistered: { type: Boolean, default: false },
  lastLogin: { type: String, required: true },
  verificationStatus: { type: Boolean, default: false },
  query: { type: String },
  allotedChoice: { type: Schema.Types.ObjectId, ref: "College" },
  currentStatus: { type: String, enum: ["float", "slide", "freez"] },
  feeStatus: {
    regFee: { type: Number },
    acceptFee: { type: Number },
  },
});

// User model
const User = mongoose.model("User", userSchema);

const userData = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St, City, Country",
    roll: 1234567890,
    rank: 5,
    fatherName: "Michael Doe",
    lastLogin: new Date().toISOString(),
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    address: "456 Oak St, City, Country",
    roll: 2345678901,
    rank: 12,
    fatherName: "David Smith",
    lastLogin: new Date().toISOString(),
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    address: "789 Pine St, City, Country",
    roll: 3456789012,
    rank: 25,
    fatherName: "Robert Johnson",
    lastLogin: new Date().toISOString(),
  },
  {
    name: "Robert Brown",
    email: "robert.brown@example.com",
    address: "101 Maple St, City, Country",
    roll: 4567890123,
    rank: 18,
    fatherName: "Edward Brown",
    lastLogin: new Date().toISOString(),
  },
  {
    name: "Michael White",
    email: "michael.white@example.com",
    address: "202 Cedar St, City, Country",
    roll: 5678901234,
    rank: 3,
    fatherName: "Thomas White",
    lastLogin: new Date().toISOString(),
  },
];

// Function to encrypt passwords and insert users into the database
async function insertUsers() {
  try {
    for (let user of userData) {
      await User.insertOne(user);
    }
  } catch (err) {
    console.error("Error inserting users: ", err);
  }
}

// Call the insert function
insertUsers();
