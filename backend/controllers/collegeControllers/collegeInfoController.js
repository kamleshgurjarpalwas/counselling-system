const College = require("../../models/collegeModels/collegeInfo.model");
const Branch = require("../../models/collegeModels/branch.model");

exports.getAllColleges = async (req, res) => {
  try {
    let { page = 1, limit = 10, tag, year } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);
    year = year ? parseInt(year) : new Date().getFullYear();

    const query = {};
    if (tag) query.tag = tag;

    const [totalColleges, colleges] = await Promise.all([
      College.countDocuments(query),
      College.find(query)
        .populate({
          path: "branches.branchDetails",
          select: "branchId branchName duration description restrictions",
        })
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
    let { collegeType, collegeId, branchId, category, year, page, limit } = req.query;

    if (collegeType && collegeId && branchId && category && year) {

      year = year ? parseInt(year) : new Date().getFullYear();

      page = parseInt(page) || 1;
      limit = parseInt(limit) || 30;

      let query = {};
      if (collegeType && collegeType !== "all") query.tag = collegeType;
      if (collegeId && collegeId !== "all") query.collegeId = collegeId;

      const colleges = await College.find(query)
        .populate({
          path: "branches.branchDetails",
          select: "branchId branchName -_id",
        })
        .lean();

      if (!colleges.length) {
        return res.status(404).json({ success: false, message: "No colleges found" });
      }

      let results = [];

      colleges.forEach((college) => {
        let filteredBranches = college.branches.filter((branch) => {
          return branchId === "all" || branch.branchDetails?.branchId === branchId;
        });

        if (filteredBranches.length === 0) return;

        let collegeData = {
          collegeId: college.collegeId,
          collegeName: college.collegeName,
          branches: [],
        };

        filteredBranches.forEach((branch) => {
          let branchData = {
            branchId: branch.branchDetails?.branchId || null,
            branchName: branch.branchDetails?.branchName || null,
            categories: {},
          };

          let categoriesToCheck = category !== "all" ? [category] : ["gen", "obc", "ews", "sc", "st"];

          categoriesToCheck.forEach((cat) => {
            let homeStateData = branch.homeState?.[cat]?.filter((r) => r.year === year) || [];
            let otherStateData = branch.otherState?.[cat]?.filter((r) => r.year === year) || [];

            branchData.categories[cat] = {
              homeState: {
                totalSeats: homeStateData.reduce((sum, r) => sum + r.totalSeats, 0),
                openingRank: homeStateData.length ? Math.min(...homeStateData.map((r) => r.openingRank)) : null,
                closingRank: homeStateData.length ? Math.max(...homeStateData.map((r) => r.closingRank)) : null,
              },
              otherState: {
                totalSeats: otherStateData.reduce((sum, r) => sum + r.totalSeats, 0),
                openingRank: otherStateData.length ? Math.min(...otherStateData.map((r) => r.openingRank)) : null,
                closingRank: otherStateData.length ? Math.max(...otherStateData.map((r) => r.closingRank)) : null,
              },
            };
          });

          collegeData.branches.push(branchData);
        });

        results.push(collegeData);
      });

      // Implement Pagination
      const totalResults = results.length;
      const totalPages = Math.ceil(totalResults / limit);
      const paginatedResults = results.slice((page - 1) * limit, page * limit);

      res.status(200).json({
        success: true,
        totalResults,
        totalPages,
        currentPage: page,
        pageSize: limit,
        data: paginatedResults,
      });
    } else {


      if (collegeId) {
        if (collegeType === "all" && collegeId === "all") {
          const branches = await Branch.find({}, "branchId branchName -_id").lean();
          return res.status(200).json({
            success: true,
            totalBranches: branches.length,
            data: branches,
          });
        }

        if (collegeType === "all" && collegeId !== "all") {
          const college = await College.findOne({ collegeId }, "branches").populate({
            path: "branches.branchDetails",
            select: "branchId branchName -_id",
          });

          if (!college) {
            return res.status(404).json({
              success: false,
              message: "College not found",
            });
          }

          const branches = college.branches.map(branch => ({
            branchId: branch.branchDetails?.branchId || "",
            branchName: branch.branchDetails?.branchName || "",
          }));

          return res.status(200).json({
            success: true,
            totalBranches: branches.length,
            data: branches,
          });

        }

        if (collegeType !== "all" && collegeId === "all") {
          const colleges = await College.find({ tag: collegeType }, "branches").populate({
            path: "branches.branchDetails",
            select: "branchId branchName -_id",
          });

          let allBranches = new Map();

          colleges.forEach(college => {
            college.branches.forEach(branch => {
              if (branch.branchDetails) {
                const { branchId, branchName } = branch.branchDetails;
                if (!allBranches.has(branchId)) {
                  allBranches.set(branchId, { branchId, branchName });
                }
              }
            });
          });

          return res.status(200).json({
            success: true,
            totalBranches: allBranches.size,
            data: Array.from(allBranches.values()),
          });
        }

        if (collegeType !== "all" && collegeId !== "all") {
          const college = await College.findOne({ collegeId, tag: collegeType }, "branches").populate({
            path: "branches.branchDetails",
            select: "branchId branchName -_id",
          });

          if (!college) {
            return res.status(404).json({
              success: false,
              message: "No matching college found for the given type and ID",
            });
          }

          const branches = college.branches.map(branch => ({
            branchId: branch.branchDetails?.branchId || "",
            branchName: branch.branchDetails?.branchName || "",
          }));

          return res.status(200).json({
            success: true,
            totalBranches: branches.length,
            data: branches,
          });
        }
      }

      let filter = {};

      if (collegeType === "all") {
        filter = {};
      } else {
        filter.tag = collegeType;
      }

      const colleges = await College.find(filter, "tag collegeId collegeName -_id").lean();

      return res.status(200).json({
        success: true,
        totalColleges: colleges.length,
        data: colleges,
      });
    }
  } catch (error) {
    console.error("Error fetching college list:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
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

const buildQuery = (query) => {
  let filter = {};

  if (query.collegeId && query.collegeId !== "ALL") {
    filter.collegeId = query.collegeId;
  }

  if (query.collegeType && query.collegeType !== "ALL") {
    filter.tag = query.collegeType;
  }

  return filter;
};

exports.test = async (req, res) => {
  try {
    let { collegeType, collegeId, branchId, category, year, page, limit } = req.query;

    year = year ? parseInt(year) : new Date().getFullYear();
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 30;

    let query = {};
    if (collegeType && collegeType !== "all") query.tag = collegeType;
    if (collegeId && collegeId !== "all") query.collegeId = collegeId;

    const colleges = await College.find(query)
      .populate({
        path: "branches.branchDetails",
        select: "branchId branchName -_id",
      })
      .lean();

    if (!colleges.length) {
      return res.status(404).json({ success: false, message: "No colleges found" });
    }

    let results = [];

    colleges.forEach((college) => {
      let filteredBranches = college.branches.filter((branch) => {
        return branchId === "all" || branch.branchDetails?.branchId === branchId;
      });

      if (filteredBranches.length === 0) return;

      let collegeData = {
        collegeId: college.collegeId,
        collegeName: college.collegeName,
        branches: [],
      };

      filteredBranches.forEach((branch) => {
        let branchData = {
          branchId: branch.branchDetails?.branchId || null,
          branchName: branch.branchDetails?.branchName || null,
          categories: {},
        };

        let categoriesToCheck = category !== "all" ? [category] : ["gen", "obc", "ews", "sc", "st"];

        categoriesToCheck.forEach((cat) => {
          let homeStateData = branch.homeState?.[cat]?.filter((r) => r.year === year) || [];
          let otherStateData = branch.otherState?.[cat]?.filter((r) => r.year === year) || [];

          branchData.categories[cat] = {
            homeState: {
              totalSeats: homeStateData.reduce((sum, r) => sum + r.totalSeats, 0),
              openingRank: homeStateData.length ? Math.min(...homeStateData.map((r) => r.openingRank)) : null,
              closingRank: homeStateData.length ? Math.max(...homeStateData.map((r) => r.closingRank)) : null,
            },
            otherState: {
              totalSeats: otherStateData.reduce((sum, r) => sum + r.totalSeats, 0),
              openingRank: otherStateData.length ? Math.min(...otherStateData.map((r) => r.openingRank)) : null,
              closingRank: otherStateData.length ? Math.max(...otherStateData.map((r) => r.closingRank)) : null,
            },
          };
        });

        collegeData.branches.push(branchData);
      });

      results.push(collegeData);
    });

    // Implement Pagination
    const totalResults = results.length;
    const totalPages = Math.ceil(totalResults / limit);
    const paginatedResults = results.slice((page - 1) * limit, page * limit);

    res.status(200).json({
      success: true,
      totalResults,
      totalPages,
      currentPage: page,
      pageSize: limit,
      data: paginatedResults,
    });
  } catch (error) {
    console.error("Error fetching rankings:", error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
