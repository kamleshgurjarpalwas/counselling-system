const express = require("express");
const routers = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const { router } = require("../app");

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
  userController.registeruser
);

routers.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at lest 6character long"),
  ],
  userController.loginuser
);

routers.get("/profile",userController.userprofile);

module.exports = routers;
