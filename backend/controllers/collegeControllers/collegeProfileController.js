const CollegeAuth = require("../../models/collegeModels/collegeAuth.model");
const College = require("../../models/collegeModels/collegeInfo.model");
const Branch = require("../../models/collegeModels/branch.model");
const bcrypt = require("bcryptjs");

exports.getCollegeProfile = async (req, res) => {
    try {
        const college = await CollegeAuth.findOne({ registrationId: req.college.registrationId }).select("-password");

        if (!college) {
            return res.status(404).json({ message: "College not found" });
        }

        res.status(200).json({ success: true, data: college });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.updateCollegeProfile = async (req, res) => {
    try {
        const { collegeTag, collegeId, collegeName, collegeMail, password } = req.body;

        let updateData = {};

        if (collegeTag) updateData.collegeTag = collegeTag;
        if (collegeId) updateData.collegeId = collegeId;
        if (collegeName) updateData.collegeName = collegeName;
        if (collegeMail) updateData.collegeMail = collegeMail;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedCollege = await CollegeAuth.findOneAndUpdate(
            { collegeId: req.college.collegeId }, 
            { $set: updateData },
            { new: true, runValidators: true }
        ).select("-password"); 

        if (!updatedCollege) {
            return res.status(404).json({ message: "College not found" });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            college: updatedCollege
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

exports.addBranchToCollege = async (req, res) => {
  try {
    const { registrationId } = req.college;

    const college = await CollegeAuth.findOne({ registrationId });

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    const { branchId, otherState, homeState } = req.body;

    const branchDetails = await Branch.findOne({ branchId });

    if (!branchDetails) {
      return res.status(404).json({ message: "Branch not found in branch details" });
    }

    const currentYear = new Date().getFullYear();

    const defaultRankData = {
      year: currentYear,
      totalSeats: 0,
      openingRank: null,
      closingRank: null,
    };

    const newBranch = {
      _id: new mongoose.Types.ObjectId(),
      branchDetails: branchDetails._id,
      otherState: {
        gen: otherState?.gen || [defaultRankData],
        obc: otherState?.obc || [defaultRankData],
        ews: otherState?.ews || [defaultRankData],
        sc: otherState?.sc || [defaultRankData],
        st: otherState?.st || [defaultRankData],
      },
      homeState: {
        gen: homeState?.gen || [defaultRankData],
        obc: homeState?.obc || [defaultRankData],
        ews: homeState?.ews || [defaultRankData],
        sc: homeState?.sc || [defaultRankData],
        st: homeState?.st || [defaultRankData],
      },
    };

    college.branches.push(newBranch);
    await college.save();

    res.status(201).json({
      message: "Branch added successfully",
      branch: newBranch,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.createNewBranch = async (req, res) => {
  try {
    const { branchId, branchName, duration, description, restrictions } = req.body;

    if (!branchId || !branchName || !duration || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingBranch = await Branch.findOne({ branchId });
    if (existingBranch) {
      return res.status(400).json({ message: "Branch already exists" });
    }

    const newBranch = new Branch({
      branchId,
      branchName,
      duration,
      description,
      restrictions,
    });

    await newBranch.save();

    res.status(201).json({ message: "Branch created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteBranchFromCollege = async (req, res) => {
  try {
    const { branchId } = req.params;
    const collegeId = req.college.collegeId; 

    const college = await College.findOne({ collegeId });
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    const branchIndex = college.branches.findIndex(branch => branch.branchDetails.toString() === branchId);
    if (branchIndex === -1) {
      return res.status(404).json({ message: "Branch not found in this college" });
    }

    college.branches.splice(branchIndex, 1);
    await college.save();

    res.status(200).json({ message: "Branch removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
