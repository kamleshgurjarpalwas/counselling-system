const express = require("express");
const routers = express.Router();
const resultControll = require("../../controllers/seatAllocation1/studentDataExtraction.js");
const {
  getCollegeSeats,
} = require("../../controllers/seatAllocation1/collegeDataExtraction.js");
const { main } = require("../../controllers/seatAllocation1/algo.js");

routers.get("/getStudentData", resultControll.transformUserRankData);

routers.get("/dj", getCollegeSeats);

routers.get("/algo", main);

module.exports = routers;
