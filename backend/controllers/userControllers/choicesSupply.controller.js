//This file is used to get the choices of colleges and branches for the user based on their advRank
// and whether they are qualified for the advanced exam or not. It uses the collegeInfoModel to fetch the data from the database.
const collegeInfoModel = require("../../models/collegeModels/collegeInfo.model");
module.exports.choices = async (req, res, next) => {
  try {
    const user = req.user;
    const selectedChoices = user.choosedChoices;
    //This function for filter out not choosed choices yet
    const filterChoices = (choices) => {
      const choices_ = [];
      choices.forEach((element) => {
        const collegeName = element.collegeName;
        const branches = element.branches;
        branches.forEach((branch) => {
          if (selectedChoices.includes(branch._id)) return;
          const branchDetails = branch.branchDetails;
          const branchId = branch._id;
          const duration = branchDetails.duration;
          const branchName = branchDetails.branchName;
          choices_.push({
            collegeName: collegeName,
            branchId: branchId,
            duration: duration,
            branchName: branchName,
          });
        });
      });
      return choices_;
    };
    console.log("Selected choices", selectedChoices);
    if (user.advRank) {
      console.log("adv qualified");

      const choices = await collegeInfoModel
        .find(
          {},
          {
            collegeName: 1,
            "branches._id": 1,
            "branches.branchDetails": 1,
            _id: 0,
          }
        )
        .populate("branches.branchDetails", "branchName duration -_id")
        .lean();

      console.log("Choices", choices);

      return res
        .status(200)
        .json({ success: true, choices: filterChoices(choices) });
    } else {
      const choices = await collegeInfoModel
        .find(
          {
            tag: { $in: ["iiit", "nit", "gfti"] },
          },
          {
            collegeName: 1,
            "branches._id": 1,
            "branches.branchDetails": 1,
            _id: 0,
          }
        )
        .populate("branches.branchDetails", "branchName duration -_id")
        .lean();

      return res
        .status(200)
        .json({ success: true, choices: filterChoices(choices) });
    }
  } catch (error) {
    console.error("Error fetching choices:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports.selectedChoices = async (req, res, next) => {
  try {
    const user = req.user;
    const selectedChoices = user.choosedChoices;
    //This function for filter out choosed choices yet
    const filterChoices = (choices) => {
      const length = selectedChoices.length;
      const selectedChoices_ = new Array(length);

      choices.forEach((element) => {
        const collegeName = element.collegeName;
        const branches = element.branches;
        branches.forEach((branch) => {
          if (!selectedChoices.includes(branch._id)) return;
          const index = selectedChoices.indexOf(branch._id);
          const branchDetails = branch.branchDetails;
          const branchId = branch._id;
          const duration = branchDetails.duration;
          const branchName = branchDetails.branchName;
          selectedChoices_[index] = {
            collegeName: collegeName,
            branchId: branchId,
            duration: duration,
            branchName: branchName,
          };
        });
      });
      return selectedChoices_;
    };
    const choices = await collegeInfoModel
      .find(
        {},
        {
          collegeName: 1,
          "branches._id": 1,
          "branches.branchDetails": 1,
          _id: 0,
        }
      )
      .populate("branches.branchDetails", "branchName duration -_id")
      .lean();
    return res
      .status(200)
      .json({ success: true, choices: filterChoices(choices) });
  } catch (error) {
    console.error("Error fetching selected choices:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
