const dotenv = require("dotenv");
dotenv.config();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const blankList = require("../models/blankList.model");

module.exports.authUser = async function (req, res, next) {
  const token = req.cookies.token || req.cookies.authorization?.splite(" ")[1];
  if (!token) {
    res.status(400).json({ message: "unauthorized user" });
  }

  const isBlankListed = blankList.findOne({ token });

  if (isBlankListed) {
    res.status(400).json({ message: "unauthorized user" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ _id: decode.id_ });
    req.user = user;
    return next();
  } catch (error) {
    res.status(401).json({ message: "unauthorized user1" });
  }
};