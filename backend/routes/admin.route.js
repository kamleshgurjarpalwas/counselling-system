const express = require("express");
const routers = express.Router();
const adminControll = require("../controllers/admin.controller");
const { body } = require("express-validator");
const autAdmin = require("../middleware/authAdmin.middleware");
routers.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("name")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  adminControll.register
);

routers.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  adminControll.login
);

routers.get("/profile", autAdmin.authAdmin, adminControll.getprofile);
routers.get("/logout",autAdmin.authAdmin,adminControll.logout);
module.exports = routers;
