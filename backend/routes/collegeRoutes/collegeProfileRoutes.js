const express = require("express");
const collegeProfileController = require("../../controllers/collegeControllers/collegeProfileController");
const { authMiddleware } = require("../../middleware/authCollege.middleware");

const router = express.Router();

router.get("/profile", authMiddleware, collegeProfileController.getCollegeProfile);

router.put("/profile", authMiddleware, collegeProfileController.updateCollegeProfile);

router.post("/profile/add-branch", authMiddleware, collegeProfileController.addBranchToCollege);

router.post("/profile/create-branch", authMiddleware, collegeProfileController.createNewBranch);

router.delete("/profile/remove-branch/:branchId", authMiddleware, collegeProfileController.deleteBranchFromCollege);



module.exports = router;
