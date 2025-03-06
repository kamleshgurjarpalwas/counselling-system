const express = require("express");
const branchController = require("../../controllers/collegeControllers/branchController");

const router = express.Router();

router.get("/", branchController.getAllBranches);

router.get("/colleges/:branchId", branchController.getCollegesByBranch);

module.exports = router;


module.exports = router;
