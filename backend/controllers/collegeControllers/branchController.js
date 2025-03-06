const College = require("../../models/collegeModels/collegeInfo.model");
const Branch = require("../../models/collegeModels/branch.model");
const mongoose = require("mongoose");

exports.getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find({}, "branchId branchName duration description restrictions");

    if (!branches.length) {
      return res.status(404).json({ success: false, message: "No branches found" });
    }

    res.status(200).json({
      success: true,
      totalBranches: branches.length,
      data: branches,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};



exports.getCollegesByBranch = async (req, res) => {
  try {
    const { branchId } = req.params;

    if (!branchId) {
      return res.status(400).json({ success: false, message: "Branch ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(branchId)) {
      return res.status(400).json({ success: false, message: "Invalid Branch ID format" });
    }

    const colleges = await College.find({ "branches.branchDetails": branchId })
      .select("collegeId collegeName -_id branches")
      .populate({
        path: "branches.branchDetails",
        select: "branchId branchName duration description",
      });

    if (!colleges.length) {
      return res.status(404).json({ success: false, message: "No colleges found for this branch" });
    }

    const filteredColleges = colleges.map((college) => ({
      collegeId: college.collegeId,
      collegeName: college.collegeName,
      branch: college.branches.filter((branch) => branch.branchDetails?._id.toString() === branchId)
      .map((filteredBranch) => ({
        branchId: filteredBranch.branchDetails?.branchId || null,
        branchName: filteredBranch.branchDetails?.branchName || null,
        duration: filteredBranch.branchDetails?.duration || null,
        description: filteredBranch.branchDetails?.description || null,
      }))[0],
    }));

    res.status(200).json({
      success: true,
      totalColleges: colleges.length,
      data: filteredColleges,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
