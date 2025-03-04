const College = require("../../models/collegeModels/collegeInfo.model");
const Branch = require("../../models/collegeModels/branch.model");
const mongoose = require("mongoose");

exports.getAllBranches = async (req, res) => {
  try {
    const colleges = await College.find().populate("branches.branchDetails");
    let allBranches = [];

    colleges.forEach(college => {
      college.branches.forEach(branch => {
        allBranches.push({
          collegeId: college.collegeId,
          collegeName: college.collegeName,
          ...branch._doc 
        });
      });
    });

    res.status(200).json(allBranches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBranchesByCollege = async (req, res) => {
  try {
    const college = await College.findOne({ collegeId: req.params.collegeId }).populate("branches.branchDetails");

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    res.status(200).json(college.branches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addBranchToCollege = async (req, res) => {
  try {
    const { collegeId } = req.params;
    const { branchId, otherState, homeState } = req.body;

    const college = await College.findOne({ collegeId });

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    const branchDetails = await Branch.findOne({ branchId });

    if (!branchDetails) {
      return res.status(404).json({ message: "Branch not found" });
    }

    const newBranch = {
      _id: new mongoose.Types.ObjectId(),
      branchDetails: branchDetails._id,
      otherState,
      homeState
    };

    college.branches.push(newBranch);
    await college.save();

    res.status(201).json({ message: "Branch added successfully", newBranch });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBranchFromCollege = async (req, res) => {
  try {
    const { collegeId, branchId } = req.params;

    const college = await College.findOne({ collegeId });

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    college.branches = college.branches.filter(branch => branch._id.toString() !== branchId);

    await college.save();
    res.status(200).json({ message: "Branch deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
