const College = require("../../models/collegeModels/collegeInfo.model");

// Using CommonJS exports (recommended for Node.js/Express)
const getCollegeSeats = async (req, res) => {
  try {
    const colleges = await College.find().populate("branches.branchDetails");

    const result = colleges.flatMap((college) =>
      college.branches
        .map((branch) => {
          const seats = [];

          const processCategory = (categoryData, categoryName) => {
            if (categoryData?.length > 0) {
              const total = categoryData.reduce(
                (sum, item) => sum + (item.totalSeats || 0),
                0
              );
              if (total > 0) seats.push({ cat: categoryName, seats: total });
            }
          };

          processCategory(branch.otherState?.gen, "Gen");
          processCategory(branch.otherState?.obc, "OBC");
          processCategory(branch.otherState?.ews, "EWS");
          processCategory(branch.otherState?.sc, "SC");
          processCategory(branch.otherState?.st, "ST");

          if (seats.length === 0) return null;

          return {
            choiceId: branch._id,
            type: college.tag === "iit" ? "adv" : "main" || "Unknown",
            seats,
          };
        })
        .filter(Boolean)
    );
    return result;
    // res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching college seats:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getCollegeSeats,
};
