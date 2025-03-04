const College = require("../../models/collegeModels/collegeInfo.model");

exports.getAllColleges = async (req, res) => {
  try {
    let { page = 1, limit = 10, sortBy = "collegeName", order = "asc", search, state, tag, year } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);
    order = order === "desc" ? -1 : 1;
    year = year ? parseInt(year) : new Date().getFullYear();

    const query = {};
    if (state) query["address.state"] = state;
    if (tag) query.tag = tag;
    if (search) {
      query.$or = [
        { collegeName: new RegExp(search, "i") },
        { collegeId: new RegExp(search, "i") },
      ];
    }

    const [totalColleges, colleges] = await Promise.all([
      College.countDocuments(query),
      College.find(query)
        .populate({
          path: "branches.branchDetails",
          select: "branchId branchName duration description restrictions",
        })
        .sort({ [sortBy]: order })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("collegeId collegeName tag address branches restrictions")
        .lean(),
    ]);

    if (!colleges.length) {
      return res.status(404).json({ success: false, message: "No colleges found" });
    }

    const formattedColleges = colleges.map(college => ({
      _id: college._id,
      tag: college.tag,
      collegeId: college.collegeId,
      collegeName: college.collegeName,
      address: college.address,
      totalBranches: college.branches.length,
      restrictions: college.restrictions,
      branches: college.branches.map(branch => ({
        _id: branch._id,
        branchId: branch.branchDetails?.branchId || null,
        branchName: branch.branchDetails?.branchName || null,
        duration: branch.branchDetails?.duration || null,
        description: branch.branchDetails?.description || null,
        restrictions: branch.branchDetails?.restrictions || {},
        otherState: filterByYear(branch.otherState, year),
        homeState: filterByYear(branch.homeState, year),
      })),
    }));

    res.status(200).json({
      success: true,
      totalColleges,
      totalPages: Math.ceil(totalColleges / limit),
      currentPage: page,
      pageSize: limit,
      colleges: formattedColleges,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};


exports.getCollegeList = async (req, res) => {
  
  try {
    let { tag, state, page, limit, search } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};

    if (tag) filter.tag = tag;
    if (state) filter["address.state"] = state;
    if (search) {
      filter.$or = [
        { collegeId: { $regex: search, $options: "i" } },
        { collegeName: { $regex: search, $options: "i" } }
      ];
    }

    const totalColleges = await College.countDocuments(filter);
    const totalPages = Math.ceil(totalColleges / limit);

    const colleges = await College.find(filter, "tag collegeId collegeName address.state")
      .skip(skip)
      .limit(limit);

    if (!colleges.length) {
      return res.status(404).json({ message: "Colleges not found" });
    }

    const formattedColleges = colleges.map(college => ({
      tag: college.tag,
      collegeId: college.collegeId,
      collegeName: college.collegeName,
      collegeState: college.address.state,
    }));

    res.status(200).json({
      success: true,
      data: formattedColleges,
      pagination: {
        totalColleges,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getCollegeById = async (req, res) => {
  try {
    const { collegeId } = req.params;
    let { year } = req.query;

    const currentYear = new Date().getFullYear();
    year = year ? parseInt(year) : currentYear;

    const college = await College.findOne({ collegeId })
      .populate({
        path: "branches.branchDetails",
        select: "branchId branchName duration description restrictions",
      });

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    const formattedCollege = {
      tag: college.tag,
      collegeId: college.collegeId,
      collegeName: college.collegeName,
      address: college.address,
      totalBranches: college.branches.length,
      restrictions: college.restrictions,
      branches: college.branches.map(branch => ({
        branchId: branch.branchDetails?.branchId || null,
        branchName: branch.branchDetails?.branchName || null,
        duration: branch.branchDetails?.duration || null,
        description: branch.branchDetails?.description || null,
        restrictions: branch.branchDetails?.restrictions || {},
        otherState: filterByYear(branch.otherState, year),
        homeState: filterByYear(branch.homeState, year),
      })),
    };

    res.status(200).json({
      success: true,
      data: formattedCollege,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getCollegeBranchById = async (req, res) => {
  try {
    const { collegeId, branchId } = req.params;
    let { year } = req.query;

    const currentYear = new Date().getFullYear();
    year = year ? parseInt(year) : currentYear;

    const college = await College.findOne({ collegeId })
      .populate({
        path: "branches.branchDetails",
        select: "branchId branchName duration description restrictions",
      });

    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    const branch = college.branches.find(branch => branch.branchDetails?.branchId === branchId);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found in this college" });
    }

    const formattedBranch = {
      branchId: branch.branchDetails?.branchId || null,
      branchName: branch.branchDetails?.branchName || null,
      duration: branch.branchDetails?.duration || null,
      description: branch.branchDetails?.description || null,
      restrictions: branch.branchDetails?.restrictions || {},
      otherState: filterByYear(branch.otherState, year),
      homeState: filterByYear(branch.homeState, year),
    };

    res.status(200).json({
      success: true,
      data: formattedBranch,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.getAllChoices = async (req, res) => {
  try {
    let { page = 1, limit = 10, search, tag, collegeName, branchName } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    const currentYear = new Date().getFullYear();

    let filter = {};
    
    if (tag) filter["tag"] = new RegExp(tag, "i");
    if (collegeName) filter["collegeName"] = new RegExp(collegeName, "i");

    if (search) {
      filter.$or = [
        { collegeId: new RegExp(search, "i") },
        { collegeName: new RegExp(search, "i") },
      ];
    }

    const totalChoices = await College.countDocuments(filter);

    const colleges = await College.find(filter)
      .populate({
        path: "branches.branchDetails",
        select: "branchId branchName duration description restrictions",
      })
      .skip(skip)
      .limit(limit)
      .lean();

    if (!colleges.length) {
      return res.status(404).json({ success: false, message: "No choices found" });
    }

    let choices = colleges.flatMap((college) =>
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
        otherState: filterByYear(branch.otherState, currentYear),
        homeState: filterByYear(branch.homeState, currentYear),
      }))
    );

    if (branchName) {
      const branchQuery = branchName.toLowerCase();
      choices = choices.filter((choice) => choice.branchName?.toLowerCase().includes(branchQuery));
    }

    res.status(200).json({
      success: true,
      totalChoices,
      totalPages: Math.ceil(totalChoices / limit),
      currentPage: page,
      pageSize: limit,
      data: choices,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


const filterByYear = (stateData, year) => {
  let filteredState = {};
  Object.keys(stateData).forEach(category => {
    const filtered = stateData[category].filter(rank => rank.year === year);
    filteredState[category] = filtered.length > 0 ? filtered : null;
  });
  return filteredState;
};

