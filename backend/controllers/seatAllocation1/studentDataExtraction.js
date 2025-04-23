const userModel = require("../../models/userModels/user.model");
const { choices } = require("../userControllers/choicesSupply.controller");

module.exports.transformUserRankData = async (req, res) => {
  try {
    // First create the array of choice IDs

    const userData = await userModel.find({}).lean();
    const transformedData = userData.map((user) => {
      // return {
      //   name: user.name,
      //   email: user.email,
      //   address: user.address,
      //   roll: user.roll,
      //   rank: user.rank,
      //   fatherName: user.fatherName,
      //   lastLogin: user.lastLogin,
      //   category: user.category,
      //   isRegistered: user.isRegistered,
      //   advRank: user.advRank,
      //   choosedChoices: user.choosedChoices,
      // };

      return user;
    });

    function addCategoryRanks(users) {
      // First, group users by their category
      const categories = {};

      // Initialize category groups
      ["Gen", "OBC", "SC", "ST"].forEach((cat) => {
        categories[cat] = [];
      });

      // Group users by category
      users.forEach((user) => {
        if (categories[user.category]) {
          categories[user.category].push(user);
        }
      });

      // For each category, sort by rank and assign catRank
      for (const [category, categoryUsers] of Object.entries(categories)) {
        // Sort by rank (ascending)
        categoryUsers.sort((a, b) => a.rank - b.rank);

        // Assign catRank (1-based index)
        categoryUsers.forEach((user, index) => {
          user.catRank = index + 1;
        });

        // Sort by advRank (ascending)
        categoryUsers.sort((a, b) => a.advRank - b.advRank);

        // Assign catAdvRank (1-based index)
        categoryUsers.forEach((user, index) => {
          user.catAdvRank = index + 1;
        });
      }

      return users;
    }

    function dataForAlgoUse() {
      const users = addCategoryRanks(transformedData);

      const algoData = users.map((user) => {
        const data = {
          id: user._id,
          type: {
            adv: {
              cat: {
                Gen: user.advRank,
              },
            },
            main: {
              cat: {
                Gen: user.rank,
              },
            },
          },
          choices: user.choosedChoices,
        };

        if (user.category !== "Gen") {
          data.type.adv.cat[user.category] = user.catAdvRank;
          data.type.main.cat[user.category] = user.catRank;
        }

        return data;
      });

      return algoData;
    }

    return dataForAlgoUse();
    // return res.status(200).json({ algoData: dataForAlgoUse() });
  } catch (error) {
    console.error("Error transforming user data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
