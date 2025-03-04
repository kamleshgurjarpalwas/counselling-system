const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const College = require("./models/collegeModels/collegeInfo.model");
const Branch = require("./models/collegeModels/branch.model");

const data = JSON.parse(fs.readFileSync(path.join(__dirname, "./college_data.json"), "utf-8"));

const DB_URI = "mongodb://localhost:27017/SE";

const insertData = async () => {
  try {
    await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to database.");

    await Branch.deleteMany({});
    await College.deleteMany({});
    console.log("Previous data cleared from College and Branch collections.");

    for (const collegeData of data) {
      let branchEntries = [];

      for (const branchData of collegeData.branches) {
        try {
          let branch = await Branch.findOne({ branchId: branchData.branchDetails.branchId });

          if (!branch) {
            branch = new Branch(branchData.branchDetails);
            await branch.save();
            console.log(`Branch ${branch.branchName} inserted.`);
          } else {
            console.log(`Branch ${branch.branchName} already exists.`);
          }

          branchEntries.push({
            branchDetails: branch._id,
            otherState: branchData.otherState,
            homeState: branchData.homeState,
          });
        } catch (error) {
          console.error(`Error handling branch ${branchData.branchDetails.branchId}:`, error);
        }
      }

      const college = new College({
        tag: collegeData.tag,
        collegeId: collegeData.collegeId,
        collegeName: collegeData.collegeName,
        address: collegeData.address,
        branches: branchEntries,
        restrictions: collegeData.restrictions || {},
      });

      try {
        await college.save();
        console.log(`College ${college.collegeName} inserted successfully!`);
      } catch (error) {
        console.error(`Error inserting college ${college.collegeName}:`, error);
      }
    }

    console.log("All data inserted successfully!");
    mongoose.disconnect();
  } catch (error) {
    console.error("Error inserting data:", error);
    mongoose.disconnect();
  }
};

insertData();
