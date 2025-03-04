const express = require("express");
const routers = express.Router();
const updateController = require("../controllers/latestUpdate.controller");
const { body } = require("express-validator");
const autAdmin = require("../middleware/authAdmin.middleware");

routers.get("/", updateController.showUpdates);

routers.post(
  "/pushUpdate",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("Title should be minimum 5 latters"),
    body("content")
      .isLength({ min: 8 })
      .withMessage("Content should be at least 8 latters"),
  ],
  autAdmin.authAdmin,
  updateController.pushUpdate
);

routers.get(
  "/delete/:updateId",
  autAdmin.authAdmin,
  updateController.deleteUpdate
);

routers.post(
  "/update",
  [
    body("updateId"),
    body("title")
      .isLength({ min: 5 })
      .withMessage("Title should be minimum 5 latters"),
    body("content")
      .isLength({ min: 8 })
      .withMessage("Content should be at least 8 latters"),
  ],
  autAdmin.authAdmin,
  updateController.update
);

module.exports = routers;
