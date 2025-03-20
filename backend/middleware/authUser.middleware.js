const dotenv = require("dotenv");
dotenv.config();
const userModel = require("../models/userModels/user.model");
const jwt = require("jsonwebtoken");
const blankList = require("../models/blankList.model");

module.exports.authUser = async function (req, res, next) {
  const token = req.cookies.token || req.cookies.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(400).json({ message: "Unauthorized user" });
  }

  try {
    const isBlankListed = await blankList.findOne({ token });
    
    if (isBlankListed) {
      return res.status(400).json({ message: "Unauthorized user" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await userModel.findOne({ _id: decoded.id_ });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized user" });
  }
};
