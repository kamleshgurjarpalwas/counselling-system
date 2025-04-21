const College = require("../../models/collegeModels/collegeInfo.model");

exports.getAllChoices = async (req, res) => {
  try {
    const user = req.user;
    let { page, limit, search, tag, collegeName, branchName } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    const currentYear = new Date().getFullYear();


    // Check if user is advanced qualified
    const isAdvancedQualify =
      user.advRank !== undefined && user.advRank !== null;

    let filter = {};

    // Filter by collegeName if provided
    if (collegeName) {
      filter["collegeName"] = new RegExp(collegeName, "i");
    }

    // Search by collegeId or collegeName
    if (search) {
      filter.$or = [
        { collegeId: new RegExp(search, "i") },
        { collegeName: new RegExp(search, "i") },
      ];
    }

    // Filtering based on user.advRank and tag
    if (!isAdvancedQualify) {
      // Not advanced qualified, exclude IITs
      if (tag) {
        filter.$and = [{ tag: tag }, { tag: { $ne: "iit" } }];
      } else {
        filter["tag"] = { $ne: "iit" };
      }
    } else {
      // Advanced qualified, include all colleges
      if (tag) {
        filter["tag"] = tag;
      }
    }

    const colleges = await College.find(filter)
      .populate({
        path: "branches.branchDetails",
        select: "branchId branchName duration description restrictions",
      })
      .lean();

    if (!colleges.length) {
      return res.status(404).json({
        success: false,
        message: "No choices found",
      });
    }

    // Flatten college and branch info into choices
    let allChoices = colleges.flatMap((college) =>
      college.branches.map((branch) => ({
        choiceId: branch._id,
        collegeId: college.collegeId,
        collegeName: college.collegeName,
        tag: college.tag || null,
        branchId: branch.branchDetails?.branchId || null,
        branchName: branch.branchDetails?.branchName || null,
        duration: branch.branchDetails?.duration || null,
        description: branch.branchDetails?.description || null,
        restrictions: branch.branchDetails?.restrictions || {},
      }))
    );

    // Filter choices by branchName if provided
    if (branchName) {
      const branchQuery = branchName.toLowerCase();
      allChoices = allChoices.filter((choice) =>
        choice.branchName?.toLowerCase().includes(branchQuery)
      );
    }

    const totalChoices = allChoices.length;
    // const paginatedChoices = allChoices.slice(skip, skip + limit);
    const paginatedChoices = allChoices;

    res.status(200).json({
      success: true,
      totalChoices,
      totalPages: Math.ceil(totalChoices / limit),
      currentPage: page,
      pageSize: limit,
      data: paginatedChoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
