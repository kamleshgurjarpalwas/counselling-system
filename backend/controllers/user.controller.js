const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/users.service");
const { model } = require("mongoose");

module.exports.registeruser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("This is data", req.body);

  const { name, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(400).json({ message: "User already exist" });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    name,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  console.log("user", user);

  return res.status(201).json({ token, user });
};

module.exports.loginuser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("This is data", req.body);

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMached = await user.comparePassword(password);

  if (!isMached) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  user.password = undefined;

  const token = user.generateAuthToken();
  req.cookie("token", token);

  console.log("user", user);

  return res.status(200).json({ token, user });
};

model.exports.userprofile = async function (req, res) {
  res.status(200).json(req.user);
};
