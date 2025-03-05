const express = require("express");
const branchController = require("../../controllers/collegeControllers/branchController");

const router = express.Router();

router.get("/", branchController.getAllBranches);

router.get("/:collegeId", branchController.getBranchesByCollege);

router.post("/:collegeId", branchController.addBranchToCollege);

router.delete("/:collegeId/:branchId", branchController.deleteBranchFromCollege);

module.exports = router;
