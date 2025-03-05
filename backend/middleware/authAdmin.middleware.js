const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModels/admin.model");
const blankList = require("../models/blankList.model");
module.exports.authAdmin = async function (req, res, next) {
  const token = req.cookies.token || req.cookies.authorization?.splite(" ")[1];
  if (!token) {
    res.status(400).json({ message: "Unouthrozied admin" });
  }

  const isBlankListed = await blankList.findOne({ token });

  if (isBlankListed) {
    res.status(400).json({ message: "unauthorized admin" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await adminModel.findOne({ _id: decode._id });
    req.admin = admin;
    return next();
  } catch (error) {
    res.status(401).json({ message: "unauthorized admin" });
  }
};
