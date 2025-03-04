const express = require("express");
const { registerCollege, loginCollege, logoutCollege } = require("../../controllers/collegeControllers/collegeAuthController");
const { authMiddleware } = require("../../middleware/authCollege.middleware");

const router = express.Router();


router.post("/register", registerCollege);

router.post("/login", loginCollege);

router.post("/logout", authMiddleware, logoutCollege);

module.exports = router;

