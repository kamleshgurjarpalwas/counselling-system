const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async function (req, res,next) {
  const token = req.cookie.token || req.cookie.authorization?.splite(" ")[1];

  if (!token) {
    res.status(400).json({ message: "unauthorized user" });
  }

  try{

  }catch{
    
  }
};
