/*const mongoose = require("mongoose");
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
*/

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

// Configuration
const DB_URI = "mongodb://127.0.0.1:27017/SE";
const DEFAULT_PASSWORD = "Student@123";
const SALT_ROUNDS = 10;
const USER_COUNT = 200;
const REGISTRATION_RATE = 0.9; // 90% registered
const VERIFICATION_RATE = 0.9; // 90% verified
const ADV_RANK_RATE = 0.9; // 90% will have advRank

// MongoDB connection
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// User Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false, required: true },
  address: { type: String, required: true },
  roll: { type: Number, required: true, unique: true },
  rank: { type: Number, required: true, unique: true },
  category: { type: String, default: "Gen" },
  advRank: { type: Number, unique: true, sparse: true },
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

const User = mongoose.model("User", userSchema);

// Utility Functions
const generateUniqueValues = (count, max) => {
  const values = new Set();
  while (values.size < count) {
    values.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(values);
};

const generateRandomUser = (index, rank, advRank) => {
  const firstNames = [
    "John",
    "Jane",
    "Robert",
    "Alice",
    "Michael",
    "Sarah",
    "David",
    "Emily",
  ];
  const lastNames = [
    "Doe",
    "Smith",
    "Johnson",
    "Brown",
    "Wilson",
    "Taylor",
    "Clark",
    "Lee",
  ];
  const domains = ["example.com", "test.com", "university.edu", "college.org"];
  const streets = ["Main", "Oak", "Pine", "Maple", "Cedar"];
  const fatherFirstNames = ["James", "William", "Thomas", "Richard", "Charles"];
  const categories = ["Gen", "OBC", "SC", "ST"];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];

  return {
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@${domain}`,
    address: `${Math.floor(Math.random() * 1000) + 1} ${
      streets[Math.floor(Math.random() * streets.length)]
    } St, City, Country`,
    roll: 1000000000 + index,
    rank: rank,
    category: categories[Math.floor(Math.random() * categories.length)],
    fatherName: `Mr. ${
      fatherFirstNames[Math.floor(Math.random() * fatherFirstNames.length)]
    } ${lastName}`,
    lastLogin: new Date(
      Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
    ).toISOString(),
    isRegistered: Math.random() < REGISTRATION_RATE,
    verificationStatus: Math.random() < VERIFICATION_RATE,
    advRank: advRank,
  };
};

const generateUserData = (count = USER_COUNT) => {
  const ranks = generateUniqueValues(count, count * 2);
  const advRanks = generateUniqueValues(
    Math.floor(count * ADV_RANK_RATE),
    count * 2
  );

  // Create array with advRanks followed by nulls
  const allAdvRanks = [...advRanks];
  while (allAdvRanks.length < count) {
    allAdvRanks.push(null);
  }

  // Shuffle the advRanks to distribute them randomly
  for (let i = allAdvRanks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allAdvRanks[i], allAdvRanks[j]] = [allAdvRanks[j], allAdvRanks[i]];
  }

  return Array.from({ length: count }, (_, i) =>
    generateRandomUser(i + 1, ranks[i], allAdvRanks[i])
  );
};

const encryptPassword = async (password = DEFAULT_PASSWORD) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

// Main Insertion Function
const seedDatabase = async () => {
  try {
    const users = generateUserData();
    const encryptedPassword = await encryptPassword();

    const usersWithPasswords = users.map((user) => ({
      ...user,
      password: encryptedPassword,
    }));

    await User.deleteMany({});
    console.log("Cleared existing user data");

    const result = await User.insertMany(usersWithPasswords);

    // Calculate statistics
    const registeredCount = result.filter((u) => u.isRegistered).length;
    const verifiedCount = result.filter((u) => u.verificationStatus).length;
    const advRankCount = result.filter((u) => u.advRank !== null).length;

    console.log(`Successfully inserted ${result.length} users`);
    console.log(
      `- ${registeredCount} (${((registeredCount / USER_COUNT) * 100).toFixed(
        1
      )}%) are registered`
    );
    console.log(
      `- ${verifiedCount} (${((verifiedCount / USER_COUNT) * 100).toFixed(
        1
      )}%) are verified`
    );
    console.log(
      `- ${advRankCount} (${((advRankCount / USER_COUNT) * 100).toFixed(
        1
      )}%) have advRank`
    );

    // Verify uniqueness
    const rankCount = new Set(result.map((u) => u.rank)).size;
    const advRankValues = result
      .map((u) => u.advRank)
      .filter((v) => v !== null);
    const advRankUniqueCount = new Set(advRankValues).size;

    console.log(`\nUniqueness verification:`);
    console.log(`- All ${rankCount} ranks are unique`);
    console.log(`- All ${advRankUniqueCount} advRanks are unique`);

    mongoose.connection.close();
  } catch (err) {
    console.error("Database seeding error:", err);
    mongoose.connection.close();
    process.exit(1);
  }
};

// Execute
seedDatabase();
