const express = require("express");
const collegeController = require("../../controllers/collegeControllers/collegeInfoController");

const router = express.Router();

router.get("/all-choices", collegeController.getAllChoices);

router.get("/alldetails", collegeController.getAllColleges);

router.get("/collegelist", collegeController.getCollegeList)

router.get("/:collegeId", collegeController.getCollegeById);

router.get("/:collegeId/:branchId", collegeController.getCollegeBranchById);



module.exports = router;